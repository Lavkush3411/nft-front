import { createSlice } from "@reduxjs/toolkit";

const NetSwitcherSlice = createSlice({
  name: "net-switcher",
  initialState: { isOpen: false },
  reducers: {
    openNetSwitcher: (state) => {
      state.isOpen = true;
    },
    closeNetSwitcher: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openNetSwitcher, closeNetSwitcher } = NetSwitcherSlice.actions;

export default NetSwitcherSlice.reducer;
