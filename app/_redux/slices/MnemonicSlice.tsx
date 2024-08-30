import { getMnemonic } from "@/app/_utils/WalletCreatingFunctions";
import { createSlice } from "@reduxjs/toolkit";

const mnemonicSlice = createSlice({
  name: "mnemonic",
  initialState: {
    mnemonic: "",
  },
  reducers: {
    setMnemonic: (state, action) => {
      state.mnemonic = action.payload;
    },
    clearMnemonic: (state) => {
      state.mnemonic = "";
    },
  },
});

export const { setMnemonic, clearMnemonic } = mnemonicSlice.actions;
export default mnemonicSlice.reducer;
