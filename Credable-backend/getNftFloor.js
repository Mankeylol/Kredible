import axios from "axios";
import {LAMPORTS_PER_SOL, } from "@solana/web3.js";

export const getNfts = async (walletAddress) => {

    let floorPrice = 0

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

    async function getTotalFloor() {


      const Nft_array_length = nftData.data.length

      try {
        for (let i = 0; i < Nft_array_length; i++) {
          let collectionId = nftData.data[i].helloMoonCollectionId;
          console.log(collectionId)
          const options = {
            method: 'POST',
            url: 'https://rest-api.hellomoon.io/v0/nft/collection/floorprice',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              authorization: 'Bearer f9322af6-68dd-4cce-a894-76bf23a0a005'
            },
            data: { helloMoonCollectionId: collectionId }
          };
          if (collectionId) {
            const floorPrice = await axios.request(options);
            const nftValue = floorPrice.data.data[0].floorPriceLamports / LAMPORTS_PER_SOL;
            totalFloor += nftValue;
          } else {
            totalFloor += 0;
          }
        }
        return totalFloor;
      } catch (error) {
        console.error(error);
      }

    }

    floorPrice = await getTotalFloor()

    return floorPrice
  }