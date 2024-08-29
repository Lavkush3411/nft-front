"use client";
import React from "react";
import Button from "./Buttons";

function Wallet({ walletNumber }: { walletNumber: number }) {
  const [isKeyVisible, setIsKeyVisible] = React.useState(false);
  const toggleKeyVisibility = () => {
    setIsKeyVisible(!isKeyVisible);
  };
  return (
    <div>
      <div className="flex flex-col items-center p-6 border border-gray-700 rounded-lg shadow-md bg-gray-800 w-80 transition duration-300 ease-in-out hover:shadow-lg hover:border-gray-600 hover:overflow-hidden">
        <h2 className="text-lg font-bold text-white text-center">
          Wallet Number: {walletNumber}
        </h2>
        <div className="mt-2 text-left w-full">
          <p className="text-gray-400">Public Key:</p>
          <p className="font-mono text-gray-200">YourPublicKeyHere</p>
        </div>
        <div className="mt-2 text-left w-full">
          <p className="text-gray-400">Private Key:</p>
          <div className="flex items-center">
            <p className="font-mono text-gray-200">
              {isKeyVisible ? "YourPrivateKeyHere" : "*********"}
            </p>
            <button
              onClick={toggleKeyVisibility}
              className="ml-2 p-1 text-gray-400 hover:text-gray-200"
              aria-label="Toggle Private Key Visibility"
            >
              {isKeyVisible ? (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.5C6.75 4.5 2.25 9 2.25 12s4.5 7.5 9.75 7.5 9.75-4.5 9.75-7.5S17.25 4.5 12 4.5zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6" // Increased size for crossed eye icon
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3l18 18M9 12h.01M15 12h.01M15 12l-3 3m0-3l3-3"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 12l-3.75-3.75M12 12l3.75 3.75"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        <div className="mt-2 text-left w-full">
          <p className="text-gray-400">Current Balance:</p>
          <p className="font-mono text-gray-200">0.00 SOL</p>
        </div>
        <div className="mt-2 text-left w-full">
          <p className="text-gray-400">NFTs Owned:</p>
          <p className="font-mono text-gray-200">0</p>
        </div>
        <div className="mt-4">
          <Button>Refresh Balance</Button>
        </div>
      </div>
    </div>
  );
}

export default Wallet;
