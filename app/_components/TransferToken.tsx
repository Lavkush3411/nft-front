import React from "react";
import Button from "./Buttons";

function TransferToken() {
  return (
    <div className="flex flex-col items-center p-8 border border-gray-700 rounded-lg shadow-md bg-gray-800 w-1/2 h-auto">
      <h2 className="text-2xl font-extrabold text-white text-center">
        Transfer Solana
      </h2>
      <div className="mt-4 w-full">
        <label className="text-gray-400 font-semibold" htmlFor="fromWallet">
          Select Wallet:
        </label>
        <select
          id="fromWallet"
          className="mt-2 w-full p-2 border border-gray-600 rounded text-gray-200 bg-gray-700 hover:bg-gray-600"
        >
          <option className="text-gray-900" value="wallet1">
            Wallet 1
          </option>
          <option className="text-gray-900" value="wallet2">
            Wallet 2
          </option>
          <option className="text-gray-900" value="wallet3">
            Wallet 3
          </option>
        </select>
      </div>
      <div className="mt-4 w-full">
        <label className="text-gray-400 font-semibold" htmlFor="toAddress">
          Enter Wallet Address:
        </label>
        <input
          type="text"
          id="toAddress"
          placeholder="Enter address"
          className="mt-2 w-full p-2 border border-gray-600 rounded text-gray-200 bg-gray-700"
        />
      </div>
      <div className="mt-6">
        <Button>Transfer</Button>
      </div>
    </div>
  );
}

export default TransferToken;
