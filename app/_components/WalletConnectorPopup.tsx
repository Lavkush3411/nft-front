"use client";
import React from "react";
import Button, { WalletOptionButton } from "./Buttons";
import { RootState } from "../_redux/store";
import { useDispatch, useSelector } from "react-redux";
import { closeWalletConnector } from "../_redux/slices/WalletConnectorSlice";

function WalletConnectorPopup() {
  const { isOpen } = useSelector((state: RootState) => state.walletConnector);
  const dispatch = useDispatch();
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg shadow-lg p-12 w-96">
        <h2 className="text-xl font-extrabold mb-4  text-white">
          Connect Your Wallet
        </h2>
        <p className="mb-4  text-gray-300">
          Please select a wallet to connect:
        </p>
        <WalletOptionButton className="">Phantom</WalletOptionButton>
        <WalletOptionButton className="w-full bg-gray-700 text-white py-3 rounded hover:bg-gray-600 transition duration-200 mt-2">
          Sollet
        </WalletOptionButton>
        <WalletOptionButton className="w-full bg-gray-700 text-white py-3 rounded hover:bg-gray-600 transition duration-200 mt-2">
          Backpack
        </WalletOptionButton>
        <button
          onClick={() => dispatch(closeWalletConnector())}
          className="mt-4 text-gray-400 hover:text-gray-200 border border-gray-600 rounded py-2 px-4 transition duration-200"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default WalletConnectorPopup;
