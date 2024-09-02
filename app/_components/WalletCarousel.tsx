"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "../_redux/store";
import Wallet from "./Wallet";
import AddWallet from "./AddWallet";

function WalletCarousel() {
  // const walletArray = React.Children.toArray(children);
  const [currentIndex, setCurrentIndex] = useState(0);
  const walletArray = useSelector((state: RootState) => state.wallets);
  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < walletArray.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  return (
    <div>
      <div className="flex justify-center items-center relative w-full">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`p-2 z-10 bg-gray-700 text-white rounded-full hover:bg-gray-900 transition-colors absolute left-2 ${
            currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          &lt;
        </button>
        <motion.div className="flex overflow-hidden justify-center w-3/4 relative">
          <motion.div
            className="flex transition-transform w-full duration-300 "
            style={{
              width: `${walletArray.length}px`,
              transform: `translateX(-${currentIndex * 350}px)`,
              // marginLeft: `${currentIndex < 4 ? "-350px" : ""}`,
              marginLeft: `${
                walletArray.length === 0 ? 0 : -350 + currentIndex * 29.3
              }px`,
            }}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {walletArray.length > 0 ? (
              walletArray.map((wallet, index) => (
                <motion.div
                  key={index}
                  className={`flex-shrink-0  mx-2 transition-transform duration-300 ${
                    index === currentIndex
                      ? " shadow-2xl bg-white rounded-xl"
                      : "scale-90 opacity-50 rounded-xl"
                  }`}
                >
                  <Wallet
                    key={index}
                    walletNumber={index + 1}
                    publicKey={wallet.publicKey}
                    privateKey={wallet.privateKey}
                  />
                </motion.div>
              ))
            ) : (
              <div className="flex justify-center items-center w-full">
                <Wallet
                  walletNumber={0}
                  publicKey={
                    "Click on Create Solana Wallet to genrate new Wallet"
                  }
                  privateKey={""}
                />
              </div>
            )}
          </motion.div>
        </motion.div>
        <button
          onClick={handleNext}
          disabled={currentIndex === walletArray.length - 1}
          className={`p-2 bg-gray-700 text-white rounded-full hover:bg-gray-900 transition-colors absolute right-2 ${
            currentIndex === walletArray.length - 1
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          &gt;
        </button>
        <div className="absolute bottom-2 flex space-x-2">
          {walletArray.length > 0 &&
            walletArray.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-2 rounded-full ${
                  index === currentIndex ? "bg-gray-700" : "bg-gray-400"
                }`}
              />
            ))}
        </div>
      </div>
      <AddWallet
        walletNumber={walletArray.length}
        setCurrentIndex={setCurrentIndex}
      />
    </div>
  );
}

export default WalletCarousel;
