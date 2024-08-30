"use client";

import React from 'react';
import { transferSol } from '../_apis/AllApis';

interface SendButtonProps {
  receiverPublic: string;
  senderPrivate: string;
  amount:number
}

const SendButton: React.FC<SendButtonProps> = ({ receiverPublic, senderPrivate, amount }) => {
  const TransferOneSol = async () => {
    try {
      await transferSol(receiverPublic, senderPrivate, amount);
      alert("1 SOL transferred successfully!");
    } catch (error) {
      console.error("Error during transfer:", error);
      alert("Failed to transfer SOL.");
    }
  };

  return (
    <button onClick={TransferOneSol} className="btn">
      Send one SOL
    </button>
  );
}

export default SendButton;
