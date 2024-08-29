import React from "react";

function Box() {
  return (
    <div className="p-4 bg-gray-800 border border-gray-600 rounded shadow-sm w-96">
      <h2 className="text-lg font-semibold mb-2 text-white">Solana Address Details</h2>
      <div className="space-y-2">
        <p className="text-gray-400">
          Balance: <span className="font-medium text-white">0 SOL</span>
        </p>
        <p className="text-gray-400">
          Token Holdings: <span className="font-medium text-white">0</span>
        </p>
        <p className="text-gray-400">
          Transaction Count: <span className="font-medium text-white">0</span>
        </p>
      </div>
    </div>
  );
}

export default Box;
