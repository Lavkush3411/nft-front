import * as solanaweb3 from "@solana/web3.js";
import bs58 from "bs58"
// Connect to the Solana mainnet
const connection = new solanaweb3.Connection("https://api.mainnet-beta.solana.com");
// const connection =  new solanaweb3.Connection("https://api.devnet.solana.com");

// Function to get balance by passing the public key
export const getBalance = async (publicKey: solanaweb3.PublicKey) => {
    let balance = await connection.getBalance(publicKey);
    return balance;
}

// Function to convert private key string to Keypair
const privateKeyStringToKeypair = (privateKeyString: string): solanaweb3.Keypair => {
    // Convert base58 private key string to Uint8Array
    const privateKeyBytes = bs58.decode(privateKeyString);
    // Create Keypair from Uint8Array
    return solanaweb3.Keypair.fromSecretKey(privateKeyBytes);
}

// Function to transfer SOL, requires receiver's public key (as string), sender's private key (as string), and amount
export const transferSol = async (receiverPub: string, senderPriv: string, amount: number) => {
    try {
        // Convert the receiver's public key to PublicKey object
        const receiverPublicKey = new solanaweb3.PublicKey(receiverPub);

        // Convert the sender's private key string to Keypair
        const senderKeypair = privateKeyStringToKeypair(senderPriv);

        // Get sender's balance
        let senderBalance = await getBalance(senderKeypair.publicKey);
        
        // Calculate the total amount needed (transfer amount + estimated transaction fee)
        const transactionFee = 5000; // in lamports (0.000005 SOL)
        const totalAmountNeeded = amount * solanaweb3.LAMPORTS_PER_SOL + transactionFee;
        
        // Check if sender's balance is sufficient
        if (senderBalance < totalAmountNeeded) {
            console.error("Error: Insufficient balance.");
            return;
        }

        // Create the transaction
        let transaction = new solanaweb3.Transaction().add(
            solanaweb3.SystemProgram.transfer({
                fromPubkey: senderKeypair.publicKey,
                toPubkey: receiverPublicKey,
                lamports: amount * solanaweb3.LAMPORTS_PER_SOL,
            })
        );

        // Set the fee payer
        transaction.feePayer = senderKeypair.publicKey;

        // Send the transaction to the network
        let transactionHash = await connection.sendTransaction(transaction, [senderKeypair]);
        console.log(`Transaction hash: ${transactionHash}`);
        
        // Confirm the transaction (optional, but useful for ensuring it's finalized)
        await connection.confirmTransaction(transactionHash);
        console.log("Transaction confirmed");

    } catch (error) {
        console.error("Transaction failed:", error);
    }
}
