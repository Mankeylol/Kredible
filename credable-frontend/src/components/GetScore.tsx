import { useWallet, } from '@solana/wallet-adapter-react';
import React, { useState } from 'react';
import { NftSVG } from './NftSVG';
import axios from 'axios'
import { LAMPORTS_PER_SOL } from '@solana/web3.js';

    const solanaWeb3 = require('@solana/web3.js');
    const endpoint = 'https://solana-mainnet.g.alchemy.com/v2/FG8gabHTRpZujrxEb_rQKlldhhXftzlK';
    const solanaConnection = new solanaWeb3.Connection(endpoint);
    let totalNftValue: number = 0

export default function GetScore() {

    const [nftValue, setNftsValue] = useState(0)
    const {publicKey} = useWallet();
    const walletAddress : string = publicKey?.toBase58()!

    const initialValue = ""

    const [username, setName] = useState(initialValue)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
        console.log(event.target);
      };

      function getScore (){
        const getTransactions = async () => {
            const pubKey = new solanaWeb3.PublicKey(walletAddress);
            let transactionList = await solanaConnection.getSignaturesForAddress(pubKey, );
            console.log(transactionList)
        }
        getTransactions()

        const getNftFloor = async () => {
    
          const options = {
        method: 'POST',
        url: 'https://rest-api.hellomoon.io/v0/nft/mints-by-owner',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: 'Bearer f9322af6-68dd-4cce-a894-76bf23a0a005'
        },
        data: {ownerAccount: walletAddress}
      };
      
         const nfts = await axios.request(options);
         const nftData = nfts.data
         const len = nftData.data.length

         for (let i = 0; i < 3; i++) {
          const collectionId = nftData.data[i].helloMoonCollectionId
          const nftFloor = async () => {
    
            const options = {
          method: 'POST',
          url: 'https://rest-api.hellomoon.io/v0/nft/collection/floorprice',
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            authorization: 'Bearer f9322af6-68dd-4cce-a894-76bf23a0a005'
          },
          data: {helloMoonCollectionId: collectionId}
        }
        const floorPrice = await axios.request(options);
        const nftValue = floorPrice.data.data[0].floorPriceLamports/LAMPORTS_PER_SOL
        console.log(nftValue)
        totalNftValue += nftValue
        console.log(totalNftValue)
         }
         let totalNftsvalue = nftFloor()
         setNftsValue(totalNftValue)
        }
      };
        getNftFloor()
      }
      console.log(nftValue)
  return (
    <div className='credit-score-container'>
        <h3>Get your on-chain credit score</h3>
        <div className='main-container'>
        <NftSVG username ={username} score='721' />
        <div className='main-form'>
            <input type="text" onChange={handleChange} id='name' value={username} required/>
            <button  disabled={!publicKey} className="getDataBtn" onClick={getScore}>
                Get score
            </button>
        </div>
        </div>
    </div>
  )
}