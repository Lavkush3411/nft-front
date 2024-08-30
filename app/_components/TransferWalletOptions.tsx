"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../_redux/store";

function TransferWalletOptions() {
  const walletArray = useSelector((state: RootState) => state.wallets);
  if (walletArray.length <= 0) return null;
  return (
    walletArray.length > 0 &&
    walletArray.map((_, index) => (
      <option key={index} className="text-gray-900" value="wallet1">
        Wallet {index + 1}
      </option>
    ))
  );
}

export default TransferWalletOptions;
