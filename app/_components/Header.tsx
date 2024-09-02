"use client";

import React, { useEffect } from "react";
import Button, { HeaderButton } from "./Buttons";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../_redux/store";
import { openWalletConnector } from "../_redux/slices/WalletConnectorSlice";
import {
  getMnemonic,
  getRootSeedFromMnemonic,
} from "../_utils/WalletCreatingFunctions";
import { setMnemonic } from "../_redux/slices/MnemonicSlice";
import { setRootSeed } from "../_redux/slices/RootSeedSlice";
import { addWallet, initWallets } from "../_redux/slices/WalletsSlice";
import AddWallet from "./AddWallet";
import NetSelector from "./NetSelector";

function Header() {
  const dispatch = useDispatch();
  const rootSeed = useSelector((state: RootState) => state.rootSeed.rootSeed);
  const wallets = useSelector((state: RootState) => state.wallets);
  function createNewMnumonic() {
    localStorage.setItem("rootSeed", ""); // manually clearing the seed eachtime
    const rootSeed = localStorage.getItem("rootSeed");
    console.log(rootSeed);
    if (!rootSeed) {
      const mnemonic = getMnemonic();
      dispatch(setMnemonic(mnemonic));
    }
  }

  useEffect(() => {
    const rootSeed = localStorage.getItem("rootSeed");
    if (rootSeed) {
      dispatch(setRootSeed(rootSeed));
    }
    const wallets = JSON.parse(localStorage.getItem("wallets") || "[]");

    if (wallets.length > 0) {
      console.log(wallets);
      dispatch(initWallets(wallets));
    }
  }, [dispatch]);

  return (
    <div className="bg-transparent p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="text-gray-100 text-2xl font-bold">Solana Explorer</h1>
        </Link>
        <div className="flex items-center space-x-4">
          {wallets.length === 0 ? (
            <Link href="/create-wallet">
              <HeaderButton onClick={createNewMnumonic}>
                Create Solana Wallet
              </HeaderButton>
            </Link>
          ) : null}
          <div className="flex items-center space-x-4">
            <HeaderButton onClick={() => dispatch(openWalletConnector())}>
              Connect Wallet
            </HeaderButton>
            <NetSelector />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
