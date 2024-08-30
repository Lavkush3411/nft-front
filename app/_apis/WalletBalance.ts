import {
    clusterApiUrl,
    Connection,
    PublicKey,
    LAMPORTS_PER_SOL
} from "@solana/web3.js";
import { ethers } from "ethers";

async function getBalanceSol(publicKeyString: string) {
    try {
        // Create a connection to the devnet cluster
        const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

        // Validate and create the PublicKey object
        let wallet;
        try {
            wallet = new PublicKey(publicKeyString);
        } catch (err) {
            console.error("Invalid public key:", err);
            return { error: "Invalid public key format." };
        }

        // Get the balance of the wallet
        const balance = await connection.getBalance(wallet);
        
        // Convert lamports to SOL
        const finalBalance = balance / LAMPORTS_PER_SOL;
        console.log(`Balance in SOL: ${finalBalance}`);

        return { balance: finalBalance };
    } catch (error) {
        console.error("Error getting balance:", error);
        return { error: "Failed to get balance. Please try again." };
    }
}

async function getBalanceEth(publicKeyString: string): Promise<{ balance?: string, error?: string }> {
    try {
        // Connect to the Ethereum network (mainnet in this case)
        const provider = new ethers.JsonRpcProvider("https://mainnet.infura.io/v3/8a19716b99ae4951988cf7148fe00f9a"); // Replace with your Infura or other RPC provider URL

        // Validate and create the address object
        let address;
        try {
            address = ethers.getAddress(publicKeyString);
        } catch (err) {
            console.error("Invalid Ethereum address:", err);
            return { error: "Invalid Ethereum address format." };
        }

        // Fetch the balance
        const balanceBigNumber = await provider.getBalance(address);
        
        // Convert balance from wei to ether
        const balanceEther = ethers.formatEther(balanceBigNumber);
        console.log(`Balance in ETH: ${balanceEther}`);

        return { balance: balanceEther };
    } catch (error) {
        console.error("Error getting balance:", error);
        return { error: "Failed to get balance. Please try again." };
    }
}

// Example usage
getBalanceEth("0x840524e15F2192b0122E357Ba41040C159E5D2f9")
getBalanceSol("4ci4nxzDyCeskEtR6zxR7CMUMyEy7y3eF6H9nGmLXTVB")

export  {getBalanceSol, getBalanceEth};
