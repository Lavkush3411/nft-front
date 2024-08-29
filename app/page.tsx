import AddWallet from "./_components/AddWallet";
import Box from "./_components/Box";
import Button from "./_components/Buttons";
import SearchBar from "./_components/SearchBar";
import TransferToken from "./_components/TransferToken";
import Wallet from "./_components/Wallet";
import WalletCarousel from "./_components/WalletCarousel";
import WalletConnectorPopup from "./_components/WalletConnectorPopup";

export default function Home() {
  return (
    <main className="container p-20 gap-20 scrollbar-hide">
      <WalletConnectorPopup />
      <WalletCarousel>
        <Wallet walletNumber={1} />
        <Wallet walletNumber={2} />
        <Wallet walletNumber={3} />
        <Wallet walletNumber={4} />
        <Wallet walletNumber={5} />
        <Wallet walletNumber={6} />
      </WalletCarousel>
      <AddWallet />
      <div className=" flex container gap-20 py-20">
        <TransferToken />
        <div className="w-full flex flex-col gap-4">
          <SearchBar
            className="w-full w-1/2"
            placeholder="Search Solana Address..."
          />
          <Box />
        </div>
      </div>
    </main>
  );
}
