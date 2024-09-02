"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNet } from "../_redux/slices/NetSelectorSlice";
import { RootState } from "../_redux/store";
import { closeNetSwitcher } from "../_redux/slices/NetSwitcherSlice";

function DevNetSwitcher() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.netSwitcher.isOpen);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg shadow-lg p-12 w-96">
        <h2 className="text-xl font-extrabold mb-4  text-white">
          Switch To Devnet
        </h2>
        <p>You will need to swith to the Devnet before requesting airdrop</p>
        <p className="mb-4  text-gray-300">
          Would you like to switch to devnet?
        </p>
        <div className="flex gap-4">
          <button
            onClick={() => {
              dispatch(setNet("DEVNET"));
              dispatch(closeNetSwitcher());
            }}
            className="mt-4 text-gray-400 hover:text-gray-200 border border-gray-600 rounded py-2 px-4 transition duration-200"
          >
            Yes
          </button>
          <button
            onClick={() => {
              dispatch(setNet("MAINNET"));
              dispatch(closeNetSwitcher());
            }}
            className="mt-4 text-gray-400 hover:text-gray-200 border border-gray-600 rounded py-2 px-4 transition duration-200"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default DevNetSwitcher;
