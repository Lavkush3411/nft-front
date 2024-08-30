import * as solanaweb3 from "@solana/web3.js";
import bs58 from "bs58";

// Connect to the Solana mainnet
const connection = new solanaweb3.Connection("https://api.mainnet-beta.solana.com");

// Function to get balance by passing the public key
export const getBalance = async (publicKey: solanaweb3.PublicKey) => {
    let balance = await connection.getBalance(publicKey);
    console.log("Balance:", balance / solanaweb3.LAMPORTS_PER_SOL);
}

// Function to transfer SOL, requires receiver's public key, sender's keypair, and amount
export const transferSol = async (receiverAcc: solanaweb3.Keypair, senderAcc: solanaweb3.Keypair, amount: number) => {
    let transaction = new solanaweb3.Transaction().add(
        solanaweb3.SystemProgram.transfer({
            fromPubkey: senderAcc.publicKey,
            toPubkey: receiverAcc.publicKey,
            lamports: amount * solanaweb3.LAMPORTS_PER_SOL,
        })
    );

    transaction.feePayer = senderAcc.publicKey;

    try {
        // Send the transaction to the network
        let transactionHash = await connection.sendTransaction(transaction, [senderAcc, receiverAcc]);
        console.log(`Transaction hash: ${transactionHash}`);
    } catch (error) {
        console.error("Transaction failed:", error);
    }
}
