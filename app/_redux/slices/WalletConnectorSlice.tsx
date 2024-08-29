import { createSlice } from "@reduxjs/toolkit";

const WalletConnectorSlice = createSlice({
  name: "wallet-connector",
  initialState: { isOpen: false },
  reducers: {
    openWalletConnector: (state) => {
      state.isOpen = true;
    },
    closeWalletConnector: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openWalletConnector, closeWalletConnector } =
  WalletConnectorSlice.actions;

export default WalletConnectorSlice.reducer;
