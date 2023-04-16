import { useWallet, } from '@solana/wallet-adapter-react';
import React, { useEffect, useState } from 'react';
import { NftSVG } from './NftSVG';
import axios from 'axios'
import { LAMPORTS_PER_SOL, Connection, PublicKey, StakeProgram, ParsedInstruction } from '@solana/web3.js';
import MintNFT from './MintNFT'
import * as dotenv from 'dotenv';


const solanaWeb3 = require('@solana/web3.js');
const endpoint = "https://solana-mainnet.g.alchemy.com/v2/FG8gabHTRpZujrxEb_rQKlldhhXftzlK" ;
const solanaConnection = new solanaWeb3.Connection(endpoint);
let totalNftValue: number = 0

export default function GetScore() {

  const [visibility, setVisibility] = useState(true)
  const [tokenListArray, setTokenArray] = useState<any[]>([])
  const [totalTransactions, setTotalTransactions] = useState<any[]>([])
  const [nftArray, setNftArray] = useState<any[]>([])
  const [nftValue, setNftsValue] = useState<any>()
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
    const getTransactions = async () => {
      const pubKey = new solanaWeb3.PublicKey(walletAddress);
      let transactionList = await solanaConnection.getSignaturesForAddress(pubKey,);
      console.log(transactionList)
      setTotalTransactions(transactionList)
    }
    getTransactions()

    const getNftFloor = async () => {

      const options = {
        method: 'POST',
        url: 'https://rest-api.hellomoon.io/v0/nft/mints-by-owner',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization:   'Bearer f9322af6-68dd-4cce-a894-76bf23a0a005'
        },
        data: { ownerAccount: walletAddress }
      };

      const nfts = await axios.request(options);
      const nftData = nfts.data
      const nftLen = nftData.data.length
      setNftArray(nftData.data)

      for (let i = 0; i < 3; i++) {
        const collectionId = nftData.data[i].helloMoonCollectionId
        const nftFloor = async () => {

          const options = {
            method: 'POST',
            url: 'https://rest-api.hellomoon.io/v0/nft/collection/floorprice',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              authorization:   'Bearer f9322af6-68dd-4cce-a894-76bf23a0a005'
            },
            data: { helloMoonCollectionId: collectionId }
          }
          const floorPrice = await axios.request(options);
          const nftValue = floorPrice.data.data[0].floorPriceLamports / LAMPORTS_PER_SOL
          console.log(nftValue)
          totalNftValue += nftValue
          console.log(totalNftValue)
          setNftsValue(totalNftValue)
        }
        nftFloor()

      }
    };
    getNftFloor()

    function getTokenPrices() {
      const getAllTokens = async () => {

        const options = {
          method: 'POST',
          url: 'https://rest-api.hellomoon.io/v0/token/balances-by-owner',
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            authorization:   'Bearer f9322af6-68dd-4cce-a894-76bf23a0a005'
          },
          data: { ownerAccount: walletAddress }
        }
        const tokenList = await axios.request(options);
        console.log(tokenList)
        setTokenArray(tokenList.data)
        const len = tokenList.data.length
        console.log(len)
      }
      getAllTokens()
    }
    getTokenPrices()

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
    
        // get transactions related to stakeAccount
        const signatureInfos = await connection.getSignaturesForAddress(stakeAccount.pubkey); // TODO: pagenation if many it has many transactions
        const signatures = signatureInfos.map((signatureInfo) => signatureInfo.signature);
        const transactions = await connection.getParsedTransactions(signatures, {maxSupportedTransactionVersion: 0});
        console.log(transactions)
    
        // print StakeProgram instructions included in the transactions
        transactions.forEach((tx) => {
          console.log("\ttransaction:", tx!.transaction.signatures[0], "slot", tx!.slot, "blockTime", new Date(tx!.blockTime! * 1000).toISOString());
          tx!.transaction.message.instructions.forEach((instruction) => {
            if (instruction.programId.equals(StakeProgram.programId)) {
              const parsed = instruction as ParsedInstruction;
              console.log("\t\tinstruction:", parsed.program, parsed.parsed.type);
            }
          });
        });
      }
    }
    
    main();
  }
  console.log(nftValue)
  console.log(nftArray)
  console.log(tokenListArray)
  function mintNft(){
    getScore()
    setVisibility(!visibility)
  }
  useEffect(()=>{
      function calculateScore (){
        setScore(totalTransactions.length)
      }
      calculateScore()
  }, [totalTransactions])

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