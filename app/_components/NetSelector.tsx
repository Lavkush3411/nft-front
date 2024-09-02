"use client";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNet } from "../_redux/slices/NetSelectorSlice";

function NetSelector() {
  const net = useSelector((state: any) => state.netSelector.net);
  const dispatch = useDispatch();
  return (
    <div className="flex items-center justify-center py-1 px-4 bg-gray-800 rounded-lg shadow-md">
      <label htmlFor="network" className="text-white mr-2">
        Select Network:
      </label>
      <select
        id="network"
        value={net}
        onChange={(e) => dispatch(setNet(e.target.value))}
        className="bg-gray-700 text-white border border-gray-600 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="DEVNET">Devnet</option>
        <option value="MAINNET">Mainnet</option>
      </select>
    </div>
  );
}

export default NetSelector;
