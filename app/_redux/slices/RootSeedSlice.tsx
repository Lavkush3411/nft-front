"use client";
import { getRootSeedFromMnemonic } from "@/app/_utils/WalletCreatingFunctions";
import { createSlice } from "@reduxjs/toolkit";

const rootSeedSlice = createSlice({
  name: "rootSeed",
  initialState: {
    rootSeed: "",
  },
  reducers: {
    setRootSeed: (state, action) => {
      const rootSeed = getRootSeedFromMnemonic(action.payload);
      state.rootSeed = rootSeed.toString("hex");
    },
  },
});

export const { setRootSeed } = rootSeedSlice.actions;
export default rootSeedSlice.reducer;
