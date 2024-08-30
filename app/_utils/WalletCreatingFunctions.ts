import { Keypair } from "@solana/web3.js";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import bs58 from "bs58";

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
