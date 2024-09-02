"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../_redux/store";

function Box() {
  const balance = useSelector((state: RootState) => state.solanaBalance);

  return (
    <div className="p-4 bg-gray-800 border border-gray-600 rounded shadow-sm w-96">
      <h2 className="text-lg font-semibold mb-2 text-white">
        Solana Address Details
      </h2>
      <div className="space-y-2">
        <p className="text-gray-400">
          Solana Balance:{" "}
          <span className="font-medium text-white">{balance.balance} SOL</span>
        </p>
        <p className="text-gray-400">
          Blance in USD :{" "}
          <span className="font-medium text-white"> ${balance.usd}</span>
        </p>
        <p className="text-gray-400">
          Blance in INR :{" "}
          <span className="font-medium text-white"> ₹{balance.inr}</span>
        </p>
      </div>
    </div>
  );
}

export default Box;
