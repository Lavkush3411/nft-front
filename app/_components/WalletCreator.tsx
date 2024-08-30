"use client";
import React from "react";
import Button from "./Buttons";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../_redux/store";
import {
  derviveKeypairFromSeed,
  getRootSeedFromMnemonic,
} from "../_utils/WalletCreatingFunctions";
import { setRootSeed } from "../_redux/slices/RootSeedSlice";
import { addWallet } from "../_redux/slices/WalletsSlice";

function WalletCreator() {
  const mnemonic = useSelector((state: RootState) => state.mnemonic.mnemonic);
  const mnemonicList = mnemonic.split(" ");
  const dispatch = useDispatch();
  function createWallet() {
    const rootSeed = getRootSeedFromMnemonic(mnemonic);
    console.log(rootSeed);
    dispatch(setRootSeed(rootSeed));
    localStorage.setItem("rootSeed", rootSeed);
    const { privateKey, publicKey } = derviveKeypairFromSeed(rootSeed, 0);
    localStorage.setItem(
      "wallets",
      JSON.stringify([{ privateKey, publicKey }])
    );
    dispatch(addWallet({ privateKey, publicKey }));
  }

  return (
    <div className="flex justify-center items-center px-32 pt-32">
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-md w-3/4">
        <p className="text-lg font-semibold">Your Mnemonic:</p>
        <div className="flex flex-wrap justify-between  my-8 gap-4">
          {mnemonicList.map((word, index) => (
            <div
              key={index}
              className="w-1/4 mx-1 p-2 border-b border-gray-400 bg-transparent text-center text-white focus:outline-none"
            >
              {word}
            </div>
          ))}
        </div>
        <p className="text-sm text-center text-gray-400 mt-2">
          This mnemonic is required to recover your wallet.
        </p>
        <div className="flex justify-center mt-4">
          <Link href="/">
            <Button
              onClick={createWallet}
              className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
            >
              Create
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default WalletCreator;
