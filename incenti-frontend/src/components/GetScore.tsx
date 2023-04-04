import { useWallet, } from '@solana/wallet-adapter-react';
import React, { FC, useState } from 'react';
import { NftSVG } from './NftSVG';

const { RestClient, NftMintsByOwnerRequest } = require("@hellomoon/api");
    const solanaWeb3 = require('@solana/web3.js');
    const endpoint = 'https://solana-mainnet.g.alchemy.com/v2/FG8gabHTRpZujrxEb_rQKlldhhXftzlK';
    const solanaConnection = new solanaWeb3.Connection(endpoint);
    const client = new RestClient("f9322af6-68dd-4cce-a894-76bf23a0a005");

export default function GetScore() {

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

        const run = async () => {
          const ownerAccount = "7kwYu6tRQnrzkasijjFiPGCYRsMnbQAvETPWXrtmq5NG";
        
          const response = await client.send(
            new NftMintsByOwnerRequest({
              ownerAccount,
            })
          );
          console.log({ response });
        };
        
        run().then(console.log).catch(console.log);
      }

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