"use client";
import React, { useEffect } from "react";
import Button from "./Buttons";
import SmallLoader from "./SmallLoader";
import { airDropSol, getBalance } from "../_utils/WalletCreatingFunctions";
import { RootState } from "../_redux/store";
import { useDispatch, useSelector } from "react-redux";
import { openNetSwitcher } from "../_redux/slices/NetSwitcherSlice";

function Wallet({
  walletNumber,
  publicKey,
  privateKey,
}: {
  walletNumber: number;
  publicKey: string;
  privateKey: string;
}) {
  const [isKeyVisible, setIsKeyVisible] = React.useState(false);
  const [balance, setBalance] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const net = useSelector((state: RootState) => state.netSelector.net);
  const dispatch = useDispatch();
  const toggleKeyVisibility = () => {
    setIsKeyVisible(!isKeyVisible);
  };

  useEffect(() => {
    if (publicKey) {
      setIsLoading(true);
      getBalance(publicKey, net).then((balance) => {
        setBalance(balance);
        setIsLoading(false);
      });
    }
  }, [publicKey, net]);

  async function handleAirdrop() {
    setSuccessMessage("");
    setErrorMessage("");
    if (net === "DEVNET") {
      try {
        setIsLoading(true);
        await airDropSol(publicKey, net);
        setSuccessMessage("Airdropped 1 SOL Will be visible in a moment");
        const balance = await getBalance(publicKey, net);
        setBalance(balance);
      } catch {
        setErrorMessage("Airdrop failed");
      } finally {
        setBalance(balance);
        setIsLoading(false);
      }
    } else {
      dispatch(openNetSwitcher());
    }
  }

  return (
    <div>
      <div className="flex flex-col width-350 items-center p-6 border border-gray-700 rounded-lg shadow-md bg-gray-800 w-80 transition duration-300 ease-in-out hover:shadow-lg hover:border-gray-600 hover:overflow-hidden">
        <h2 className="text-lg font-bold text-white text-center my-2">
          {walletNumber === 0 ? "Dummy Wallet" : `Wallet ${walletNumber}`}
        </h2>
        <div className="mt-2 text-wrap break-words text-left w-full">
          <p className="text-gray-400 ">Public Key:</p>
          <p className="font-mono  text-gray-200">
            {publicKey
              ? publicKey
              : "Click on Create Solana Wallet to genrate new Wallet"}
          </p>
        </div>
        <div className="mt-2 text-left w-full">
          <p className="text-gray-400">Private Key:</p>
          <div className="flex items-center">
            <p className="font-mono break-all text-gray-200">
              {isKeyVisible
                ? privateKey
                : "********************************************************************************************"}
            </p>
            <button
              onClick={toggleKeyVisibility}
              className="ml-2  p-1 text-gray-400 hover:text-gray-200"
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

        <div className=" text-left w-full">
          <p className="text-gray-400">Current Balance:</p>
          <p className="font-mono text-gray-200">
            {isLoading ? <SmallLoader /> : balance} SOL
          </p>
        </div>
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <div className="my-6 flex items-center space-x-4">
          <Button
            onClick={async () => {
              setIsLoading(true);
              setSuccessMessage("");
              setErrorMessage("");
              const balance = await getBalance(publicKey, net);
              setBalance(balance);
              setIsLoading(false);
            }}
          >
            Refresh Balance
          </Button>
          <Button onClick={handleAirdrop}>Airdrop 1 SOL</Button>
        </div>
      </div>
    </div>
  );
}

export default Wallet;
