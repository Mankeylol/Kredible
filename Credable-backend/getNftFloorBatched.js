import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import axios from "axios";

export async function getFloor (walletAddress) {
    let totalFloor = 0

    const options = {
        method: 'POST',
        url: 'https://rest-api.hellomoon.io/v0/nft/mints-by-owner',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: 'Bearer f9322af6-68dd-4cce-a894-76bf23a0a005'
        },
        data: { ownerAccount: walletAddress }
      };
  
      const nfts = await axios.request(options);
      const nftData = nfts.data

      const Nft_array_length = nftData.data.length

      let collectionIds = []

      for (let i = 0; i < Nft_array_length; i++) {
        
        let collectionId = nftData.data[i].helloMoonCollectionId;

        if (collectionId) {
            collectionIds.push(collectionId)
        }
      }

      const getNftPrices = {
        method: 'POST',
        url: 'https://rest-api.hellomoon.io/v0/nft/collection/floorprice/batched',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: 'Bearer f9322af6-68dd-4cce-a894-76bf23a0a005'
        },
        data: { helloMoonCollectionId: collectionIds }
      };

      let getNftPriceResponse = await axios.request(getNftPrices);

      let nftPricesData = getNftPriceResponse.data.data

      for (let i = 0; i < nftPricesData.length; i++) {
        let floor = nftPricesData[i].floorPriceLamports / LAMPORTS_PER_SOL

        totalFloor += floor
      }
      console.log(totalFloor)
      return totalFloor
}