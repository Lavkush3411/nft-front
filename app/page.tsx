import Box from "./_components/Box";
import DevNetSwitcher from "./_components/DevNetSwitcher";
import SearchBar from "./_components/SearchBar";
import TransferToken from "./_components/TransferToken";
import WalletCarousel from "./_components/WalletCarousel";
import WalletConnectorPopup from "./_components/WalletConnectorPopup";

export default function Home() {
  return (
    <main className="container p-20 gap-20 scrollbar-hide">
      <WalletConnectorPopup />
      <WalletCarousel />
      <DevNetSwitcher />
      <div className="flex container gap-20 py-20">
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
