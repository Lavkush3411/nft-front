"use client";

import { Keypair } from "@solana/web3.js";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import bs58 from "bs58";
import * as solanaweb3 from "@solana/web3.js";

const devnet =
  "https://solana-devnet.g.alchemy.com/v2/SyNc57F7lA71QjhUSZ8J9BdAFHtWVyH_";
const mainnet =
  "https://solana-mainnet.g.alchemy.com/v2/SyNc57F7lA71QjhUSZ8J9BdAFHtWVyH_";
const devnetConnection = new solanaweb3.Connection(devnet);
const mainnetConnection = new solanaweb3.Connection(mainnet);

export const getBalance = async (publicKey: string, net: string) => {
  let connection;
  if (net === "DEVNET") {
    connection = devnetConnection;
  } else {
    connection = mainnetConnection;
  }

  try {
    let balance = await connection.getBalance(
      new solanaweb3.PublicKey(publicKey)
    );
    return balance / solanaweb3.LAMPORTS_PER_SOL;
  } catch (err) {
    return 0;
  }
};

export const airDropSol = async (publicKey: string, net: string) => {
  let connection;
  if (net === "DEVNET") {
    connection = devnetConnection;
  } else {
    connection = mainnetConnection;
  }

  try {
    let airdrop = await connection.requestAirdrop(
      new solanaweb3.PublicKey(publicKey),
      1 * solanaweb3.LAMPORTS_PER_SOL
    );
    return { status: "Success", message: "Airdropped 1 SOL" };
  } catch (err) {
    return { status: "Error", message: "Airdrop failed" };
  }
};

export const getMnemonic = () => {
  const mnemonic = generateMnemonic();
  return mnemonic;
};

export const getRootSeedFromMnemonic = (mnemonic: string) => {
  const seed = mnemonicToSeedSync(mnemonic);
  return seed.toString("hex");
};

export const derviveKeypairFromSeed = (seed: string, walletNumber: number) => {
  const path = `m/44'/501'/0'/${walletNumber}'`;
  const { key: derivedSeed } = derivePath(path, seed);
  const { secretKey } = nacl.sign.keyPair.fromSeed(derivedSeed);
  const keypair = Keypair.fromSecretKey(secretKey);
  const privateKey = bs58.encode(secretKey);
  const publicKey = keypair.publicKey.toBase58();
  return { privateKey, publicKey };
};

export const getExchangeRates = async () => {
  const [usd, inr] = await Promise.all([
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=usd"
    ).then((res) => res.json()),
    fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=solana&vs_currencies=inr"
    ).then((res) => res.json()),
  ]);
  return [usd.solana.usd, inr.solana.inr];
};

// Function to convert private key string to Keypair
const privateKeyStringToKeypair = (
  privateKeyString: string
): solanaweb3.Keypair => {
  // Convert base58 private key string to Uint8Array
  const privateKeyBytes = bs58.decode(privateKeyString);
  // Create Keypair from Uint8Array
  return solanaweb3.Keypair.fromSecretKey(privateKeyBytes);
};

// Function to transfer SOL, requires receiver's public key (as string), sender's private key (as string), and amount
export const transferSol = async (
  receiverPub: string,
  senderPriv: string,
  amount: number,
  net: string
) => {
  let connection;
  if (net === "DEVNET") {
    connection = devnetConnection;
  } else {
    connection = mainnetConnection;
  }

  try {
    // Convert the receiver's public key to PublicKey object
    const receiverPublicKey = new solanaweb3.PublicKey(receiverPub);

    // Convert the sender's private key string to Keypair
    const senderKeypair = privateKeyStringToKeypair(senderPriv);

    // Get sender's balance
    let senderBalance = await getBalance(
      senderKeypair.publicKey.toString(),
      net
    );

    // Calculate the total amount needed (transfer amount + estimated transaction fee)
    const transactionFee = 0.000005; // in lamports (0.000005 SOL)
    const totalAmountNeeded =
      amount / solanaweb3.LAMPORTS_PER_SOL + transactionFee;
    // Check if sender's balance is sufficient
    if (senderBalance < totalAmountNeeded) {
      console.error("Error: Insufficient balance.");
      return { status: "Error", message: "Insufficient balance" };
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
    let transactionHash = await connection.sendTransaction(transaction, [
      senderKeypair,
    ]);
    console.log(`Transaction hash: ${transactionHash}`);
    return { status: "Success", message: "Transaction sent" };
    // Confirm the transaction (optional, but useful for ensuring it's finalized)
    await connection.confirmTransaction(transactionHash);
    console.log("Transaction confirmed");
  } catch (error) {
    console.error("Transaction failed:", error);
  }
};
