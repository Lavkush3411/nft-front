import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  usd: 0,
  inr: 0,
};

const solanaBalanceSlice = createSlice({
  name: "solanaBalance",
  initialState,
  reducers: {
    setBalance: (state, action) => {
      return action.payload;
    },
  },
});

export default solanaBalanceSlice.reducer;
export const { setBalance } = solanaBalanceSlice.actions;
