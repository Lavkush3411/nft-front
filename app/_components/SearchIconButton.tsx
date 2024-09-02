import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBalance } from "../_redux/slices/SolanaBalanceSlice";
import SmallLoader from "./SmallLoader";
import {
  getBalance,
  getExchangeRates,
} from "../_utils/WalletCreatingFunctions";
import { RootState } from "../_redux/store";

function SearchIconButton({ search }: { search: string }) {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const net = useSelector((state: RootState) => state.netSelector.net);
  return (
    <div>
      {isLoading ? (
        <SmallLoader />
      ) : (
        <button
          type="button"
          disabled={isLoading}
          className="p-2 text-gray-400 hover:text-gray-500"
          aria-label="Search"
          onClick={async () => {
            if (search.length === 0) {
              throw new Error("Search address cannot be empty");
            }

            setIsLoading(true);
            try {
              const rates = await getExchangeRates();
              const data = await getBalance(search, net);
              dispatch(
                setBalance({
                  balance: data,
                  usd: Math.round(rates[0] * data * 100) / 100,
                  inr: Math.round(rates[1] * data * 100) / 100,
                })
              );
            } catch (error) {
              console.log(error);
            } finally {
              setIsLoading(false);
            }
          }}
        >
          <svg
            className="w-5 h-5 cursor-pointer"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

export default SearchIconButton;
