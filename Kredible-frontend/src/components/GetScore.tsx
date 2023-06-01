import { useWallet, } from '@solana/wallet-adapter-react';
import React, {  useState } from 'react';
import { NftSVG } from './NftSVG';
import axios from 'axios'
import { Connection, PublicKey, StakeProgram } from '@solana/web3.js';
import MintNFT from './MintNFT'




export default function GetScore() {

  const [visibility, setVisibility] = useState(true)
  const [score, setScore] = useState(0)
  const { publicKey, } = useWallet();
  const walletAddress: string = publicKey?.toBase58()!

  const initialValue = ""

  const [username, setName] = useState(initialValue)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    console.log(event.target);
    
  };


  function mintNft(){

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