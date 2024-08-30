"use client";
import { useEffect, useState } from "react";
import AddWallet from "./_components/AddWallet";
import Box from "./_components/Box";
import Button from "./_components/Buttons";
import SearchBar from "./_components/SearchBar";
import TransferToken from "./_components/TransferToken";
import Wallet from "./_components/Wallet";
import WalletCarousel from "./_components/WalletCarousel";
import WalletConnectorPopup from "./_components/WalletConnectorPopup";
import bs58 from "bs58";
import { getBalance, transferSol } from "./_apis/apis";
import * as solanaweb3 from "@solana/web3.js";

export default function Home() {


const transfersol = (senderPrivateKey:solanaweb3.PublicKey, recieverPrivateKey:solanaweb3.PublicKey) => {
  // to send sol you need keypair of that sender walletthis will create it
  const senderWallet  = solanaweb3.Keypair.fromSecretKey(
    bs58.decode(
      `${senderPrivateKey}`
    )
  );
  // to send sol you need keypair of that reciever walletthis will create it
  const recieverWallet = solanaweb3.Keypair.fromSecretKey(
    bs58.decode(
      `${recieverPrivateKey}`
    )
  );
  let amount =1;
    transferSol(recieverWallet, senderWallet, 1);
  };
  useEffect(() => {
    getBalance(
      new solanaweb3.PublicKey("4ci4nxzDyCeskEtR6zxR7CMUMyEy7y3eF6H9nGmLXTVB")
    )
  }, []);

  return (
    <main className="container p-20 gap-20 scrollbar-hide">
      <WalletConnectorPopup />
      <WalletCarousel>
        <Wallet walletNumber={1} />
        <Wallet walletNumber={2} />
        <Wallet walletNumber={3} />
        <Wallet walletNumber={4} />
        <Wallet walletNumber={5} />
        <Wallet walletNumber={6} />
      </WalletCarousel>
      <AddWallet />
      <WalletCarousel />
      <div className=" flex container gap-20 py-20">
        <TransferToken />
        <div className="w-full flex flex-col gap-4">
          <SearchBar
            className="w-full w-1/2"
            placeholder="Search Solana Address..."
          />
          <Box />
        </div>
      </div>
    </main>
  );
}
