import { createSlice } from "@reduxjs/toolkit";

const NetSelectorSlice = createSlice({
  name: "NetSelector",
  initialState: {
    net: "DEVNET",
  },
  reducers: {
    setNet: (state, action) => {
      state.net = action.payload;
    },
  },
});

export const { setNet } = NetSelectorSlice.actions;
export default NetSelectorSlice.reducer;
