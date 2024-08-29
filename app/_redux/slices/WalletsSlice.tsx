import { createSlice } from "@reduxjs/toolkit";

type Wallet = {
  publicKey: string;
  privateKey: string;
};

const WalletsSlice = createSlice({
  name: "wallets",
  initialState: [] as Wallet[],

  reducers: {
    addWallet: (state, action) => {
      state.push(action.payload);
    },
    initWallets: (state, action) => {
      return action.payload;
    },
    removeWallet: (state, action) => {
      return state.filter((wallet) => wallet.publicKey !== action.payload);
    },
  },
});

export const { addWallet, initWallets, removeWallet } = WalletsSlice.actions;
export default WalletsSlice.reducer;
