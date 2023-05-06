import { useWallet, } from '@solana/wallet-adapter-react';
import React, { useEffect, useState } from 'react';
import { NftSVG } from './NftSVG';
import axios from 'axios'
import { Connection, PublicKey, StakeProgram, ParsedInstruction } from '@solana/web3.js';
import MintNFT from './MintNFT'




const endpoint = "https://solana-mainnet.g.alchemy.com/v2/FG8gabHTRpZujrxEb_rQKlldhhXftzlK" ;

export default function GetScore() {

  const [visibility, setVisibility] = useState(true)
  const [tokenListArray, setTokenArray] = useState<any[]>([])
  const [score, setScore] = useState(0)
  const { publicKey, } = useWallet();
  const walletAddress: string = publicKey?.toBase58()!

  const initialValue = ""

  const [username, setName] = useState(initialValue)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    console.log(event.target);
    
  };
  function getScore() {

    async function main() {

      // this RPC MUST SUPPORT getProgramAccounts method (some RPC server disables it)
      const RPC_ENDPOINT_URL = process.env["RPC_ENDPOINT_URL"];
    
      // delegate Tx1: https://solscan.io/tx/35Fs9HmV9nCjvoR2JQb1WqepKMALpAfAAQGEFXB9ZfHNxZu3pJREzDw2U4Ls1Nk12Psdg1peC6kwYUYGbsfoZM1S
      // delegate Tx2: https://solscan.io/tx/3PSRnHsha1WKE1KGCvvsLepJBpDG2sCyNQuquNQnrUUh5HJ4x8paRCKrCKn24US4GHeFusME3KdZbEQQhEx9c22L
      const TARGET_WALLET_ADDRESS = new PublicKey("r21Gamwd9DtyjHeGywsneoQYR39C1VDwrw7tWxHAwh6");
      console.log(TARGET_WALLET_ADDRESS)
    
      const connection = new Connection(endpoint, "confirmed");
    
      // list all existing stake accounts
      //
      //   Stake accounts that have already been deleted cannot be detected.
      //   If you want to check for stake accounts that existed in the past,
      //   you would have to go back through all the transactions related to the wallet.
      const stakeAccounts = await connection.getProgramAccounts(
        StakeProgram.programId,
        {
          
          filters: [
            { dataSize: 200 },
            { memcmp: {offset: 12 /* staker pubkey */, bytes: TARGET_WALLET_ADDRESS.toBase58()} },
          ],
          encoding: "base64",
        },
      );
      console.log(stakeAccounts)
    
      for (const stakeAccount of stakeAccounts) {
        console.log("stakeAccount:", stakeAccount.pubkey.toBase58());
      }
    }
    
    main();
  }
  console.log(tokenListArray)
  function mintNft(){
    getScore()
    setVisibility(!visibility)
  }

  return (
    <div className='credit-score-container'>
      <h3>Get your on-chain credit score</h3>
      <div className='main-container'>
        <NftSVG username={username} score={score} />
       {(visibility) ?  <div className='main-form' style={{ display: visibility ? "" : "none" }}>
          <input className='input' type="text" onChange={handleChange} id='name' value={username} required />
          <button disabled={!publicKey} className="getDataBtn" onClick={mintNft}>
            Get score
          </button>
        </div>:  <MintNFT username ={username} score ={score}/>}
      </div>
    </div>
  )
}