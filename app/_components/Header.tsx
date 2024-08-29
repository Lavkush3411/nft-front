"use client";

import React from "react";
import Button, { HeaderButton } from "./Buttons";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../_redux/store";
import { openWalletConnector } from "../_redux/slices/WalletConnectorSlice";

function Header() {
  const dispatch = useDispatch();
  return (
    <div className="bg-transparent p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="text-gray-100 text-2xl font-bold">Solana Explorer</h1>
        </Link>
        <div className="space-x-4">
          <Link href="/create-wallet">
            <HeaderButton>Create Solana Wallet</HeaderButton>
          </Link>
          <HeaderButton onClick={() => dispatch(openWalletConnector())}>
            Connect Wallet
          </HeaderButton>
        </div>
      </div>
    </div>
  );
}

export default Header;
