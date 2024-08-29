"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

function WalletCarousel({ children }: { children: React.ReactNode }) {
  const walletArray = React.Children.toArray(children);
  const [currentIndex, setCurrentIndex] = useState(0);

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
      <motion.div className="flex overflow-hidden w-3/4 relative">
        <motion.div
          className="flex transition-transform duration-300 "
          style={{
            width: `${walletArray.length * 320}px`,
            transform: `translateX(-${currentIndex * 320}px)`,
          }}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {walletArray.map((child, index) => (
            <motion.div
              key={index}
              className={`flex-shrink-0 w-80 mx-2 transition-transform duration-300 ${
                index === currentIndex
                  ? " shadow-2xl bg-white rounded-xl"
                  : "scale-90 opacity-50 rounded-xl"
              }`}
            >
              {child}
            </motion.div>
          ))}
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
        {walletArray.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full ${
              index === currentIndex ? "bg-gray-700" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default WalletCarousel;
