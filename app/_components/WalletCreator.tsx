import React from "react";
import Button from "./Buttons";
import Link from "next/link";

function WalletCreator() {
  return (
    <div className="flex justify-center items-center px-32 pt-32">
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-md w-3/4">
        <p className="text-lg font-semibold">Your Mnemonic:</p>
        <div className="flex flex-col">
          {Array.from({ length: 4 }, (_, rowIndex) => (
            <div key={rowIndex} className="flex justify-center mb-2">
              {Array.from({ length: 3 }, (_, index) => (
                <input
                  key={index}
                  type="text"
                  className="w-1/4 mx-1 p-2 border-b border-gray-400 bg-transparent text-center text-white focus:outline-none"
                  placeholder=" "
                />
              ))}
            </div>
          ))}
        </div>
        <p className="text-sm text-center text-gray-400 mt-2">
          This mnemonic is required to recover your wallet.
        </p>
        <div className="flex justify-center mt-4">
          <Link href="/">
            <Button className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600">
              Next
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default WalletCreator;
