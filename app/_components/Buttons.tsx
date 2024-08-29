"use client";

import React from "react";

function Button({
  children,
  onClick,
  className,
}: {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 text-white font-semibold rounded-lg shadow-md transition bg-gray-700 hover:bg-gray-600 duration-300 ease-in-out"
    >
      {children}
    </button>
  );
}

function WalletOptionButton({
  children,
  onClick,
  className,
}: {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={
        "w-full bg-gray-700 text-white py-3 rounded hover:bg-gray-600 transition duration-200 mt-2"
      }
    >
      {children}
    </button>
  );
}

function HeaderButton({
  children,
  onClick,
  className,
}: {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={
        "px-4 py-2 bg-white text-gray-900 font-semibold rounded shadow-md hover:bg-gray-100 transition duration-300 ease-in-out"
      }
    >
      {children}
    </button>
  );
}

export { Button, HeaderButton, WalletOptionButton };

export default Button;
