import { configureStore } from "@reduxjs/toolkit";
import WalletConnectorSlice from "./slices/WalletConnectorSlice";
import RootSeedSlice from "./slices/RootSeedSlice";
import MnemonicSlice from "./slices/MnemonicSlice";
import WalletsSlice from "./slices/WalletsSlice";
import SolanaBalanceSlice from "./slices/SolanaBalanceSlice";
import NetSelectorSlice from "./slices/NetSelectorSlice";
import NetSwitcherSlice from "./slices/NetSwitcherSlice";
const store = configureStore({
  reducer: {
    walletConnector: WalletConnectorSlice,
    rootSeed: RootSeedSlice,
    mnemonic: MnemonicSlice,
    wallets: WalletsSlice,
    solanaBalance: SolanaBalanceSlice,
    netSelector: NetSelectorSlice,
    netSwitcher: NetSwitcherSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
