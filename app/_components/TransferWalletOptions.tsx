"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../_redux/store";

function TransferWalletOptions() {
  const walletArray = useSelector((state: RootState) => state.wallets);
  if (walletArray.length <= 0) return null;
  return (
    <>
      <option>Select Wallet</option>

      {walletArray.length > 0 &&
        walletArray.map((keypair, index) => (
          <option
            key={index}
            className="text-gray-900 cursor-pointer text-white hover:bg-gray-600"
            value={keypair.privateKey}
          >
            Wallet {index + 1}
          </option>
        ))}
    </>
  );
}

export default TransferWalletOptions;
