import axios from "axios";

async function getNFTCount(publicKeyString: string): Promise<{ count?: number, error?: string }> {
    try {
        const apiUrl = `https://api.opensea.io/api/v1/assets`;
        const response = await axios.get(apiUrl, {
            params: {
                owner: publicKeyString,
                order_direction: "desc",
                offset: 0,
                limit: 1
            }
        });
        
        // Extract NFT count from the response
        const nftCount = response.data.assets.length;
        console.log(`Number of NFTs: ${nftCount}`);

        return { count: nftCount };
    } catch (error) {
        console.error("Error fetching NFTs:", error);
        return { error: "Failed to fetch NFT count. Please try again." };
    }
}

getNFTCount("0x840524e15F2192b0122E357Ba41040C159E5D2f9")

export default getNFTCount;
