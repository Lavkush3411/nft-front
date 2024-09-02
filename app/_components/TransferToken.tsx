"use client";
import React, { useState } from "react";
import Button from "./Buttons";
import TransferWalletOptions from "./TransferWalletOptions";
import { transferSol } from "../_utils/WalletCreatingFunctions";
import SmallLoader from "./SmallLoader";
import { useSelector } from "react-redux";
import { RootState } from "../_redux/store";

function TransferToken() {
  const [fromWallet, setFromWallet] = useState<string>("");
  const [toAddress, setToAddress] = useState<string>("");
  const [amount, setAmount] = useState<number>(0);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const net = useSelector((state: RootState) => state.netSelector.net);
  const handleTransfer = async () => {
    if (!fromWallet || !toAddress || !amount) {
      setError("Please fill all the fields");
      return;
    }
    setError("");
    setSuccessMessage("");
    try {
      setLoading(true);
      const data = await transferSol(toAddress, fromWallet, amount, net);
      if (data?.status === "Success") {
        setSuccessMessage("Transaction sent, Balance will be updated shortly");
      } else {
        setError("Transaction failed");
      }
      console.log(data);
    } catch (error) {
      setError("Transaction failed");
    } finally {
      setLoading(false);
    }
  };

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
          onChange={(e) => {
            setFromWallet(e.target.value);
          }}
          className="mt-2 w-full p-2 border border-gray-600 rounded text-gray-200 bg-gray-700 hover:bg-gray-600 cursor-pointer"
        >
          <TransferWalletOptions />
        </select>
      </div>
      <div className="mt-4 w-full">
        <label className="text-gray-400 font-semibold" htmlFor="amount">
          Enter Amount:
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          placeholder="Enter amount"
          className="mt-2 w-full p-2 border border-gray-600 rounded text-gray-200 bg-gray-700"
          onChange={(e) => setAmount(Number(e.target.value))}
          style={{ appearance: "none", MozAppearance: "textfield" }} // Remove default up and down arrow keys
        />
      </div>
      <div className="mt-4 w-full">
        <label className="text-gray-400 font-semibold" htmlFor="toAddress">
          Enter Wallet Address:
        </label>
        <input
          type="text"
          id="toAddress"
          value={toAddress}
          placeholder="Enter address"
          className="mt-2 w-full p-2 border border-gray-600 rounded text-gray-200 bg-gray-700"
          onChange={(e) => setToAddress(e.target.value)}
        />
      </div>
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      {successMessage && (
        <p className="text-green-500 mt-4 text-center">{successMessage}</p>
      )}
      <div className="mt-6">
        {loading ? (
          <SmallLoader />
        ) : (
          <Button onClick={handleTransfer}>Transfer</Button>
        )}
      </div>
    </div>
  );
}

export default TransferToken;
