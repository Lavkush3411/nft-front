import { configureStore } from "@reduxjs/toolkit";
import WalletConnectorSlice from "./slices/WalletConnectorSlice";

const store = configureStore({
  reducer: {
    walletConnector: WalletConnectorSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
