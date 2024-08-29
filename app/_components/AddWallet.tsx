"use client";
import React from "react";
import { HeaderButton } from "./Buttons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../_redux/store";
import { derviveKeypairFromSeed } from "../_utils/WalletCreatingFunctions";
import { addWallet } from "../_redux/slices/WalletsSlice";

function AddWallet() {
  const dispatch = useDispatch();
  function addNewSolanaWallet() {
    const rootSeed = localStorage.getItem("rootSeed");
    if (!rootSeed) {
      return;
    }
    const wallets = JSON.parse(localStorage.getItem("wallets") || "[]");

    const { privateKey, publicKey } = derviveKeypairFromSeed(
      rootSeed,
      wallets.length
    );
    dispatch(addWallet({ privateKey, publicKey }));
    wallets.push({ privateKey, publicKey });
    localStorage.setItem("wallets", JSON.stringify(wallets));
  }

  const walletArray = useSelector((state: RootState) => state.wallets);
  if (walletArray.length <= 0) return null;
  return (
    <HeaderButton onClick={addNewSolanaWallet}>
      Add New Solana Wallet
    </HeaderButton>
  );
}

export default AddWallet;
