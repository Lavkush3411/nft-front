import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./_components/Header";
import StoreProvider from "./_redux/StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Solana Explorer",
    default: "Solana Explorer",
  },
  description: "A simple Solana wallet",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={inter.className}>
          <div className="flex flex-col min-h-screen scrollbar-hide">
            <Header />

            {children}
          </div>
        </body>
      </html>
    </StoreProvider>
  );
}
