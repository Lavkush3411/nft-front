import * as solanaweb3 from "@solana/web3.js";
import bs58 from "bs58";


const connection =  new solanaweb3.Connection("https://api.devnet.solana.com");


export const getBalance = async(publicKey: solanaweb3.PublicKey)=>{
    let balance = await connection.getBalance(publicKey);

    console.log("blanace ",balance/ solanaweb3.LAMPORTS_PER_SOL);
}

// Fix: Pass the correct public key type
getBalance(new solanaweb3.PublicKey("4ci4nxzDyCeskEtR6zxR7CMUMyEy7y3eF6H9nGmLXTVB"));

const airdropSol = async()=>{
    let txhash = await connection.requestAirdrop(senderWallet.publicKey, 1e9)
    console.log(`txhash ${txhash}`);
}

// airdropSol()
export const transferSol = async(receiverAcc: solanaweb3.Keypair, senderAcc: solanaweb3.Keypair, amount: number )=>{
    let transaction = await new solanaweb3.Transaction().add(
        solanaweb3.SystemProgram.transfer({
        fromPubkey: senderAcc.publicKey,
        toPubkey: receiverAcc.publicKey,
        lamports: amount * solanaweb3.LAMPORTS_PER_SOL,
        })
    )

    transaction.feePayer = senderAcc.publicKey;
    let transcationHash = await connection.sendTransaction(transaction,[senderAcc,receiverAcc]);
    console.log(`trabscato has ${transcationHash}`);

}

// transferSol();