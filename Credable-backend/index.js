import puppeteer from "puppeteer"
import { exec } from "node:child_process"
import { promisify } from "node:util"
import { Metaplex, toMetaplexFile,bundlrStorage,
    keypairIdentity, } from "@metaplex-foundation/js";
import { Connection, clusterApiUrl, Keypair, LAMPORTS_PER_SOL,} from "@solana/web3.js";
import solanaWeb3 from '@solana/web3.js';
import fs from "fs"
import express from 'express'
import cors from 'cors'
import axios from "axios";
import { totalmem } from "node:os";


const app = express()
const PORT = 8080;


const { stdout: chromiumPath } = await promisify(exec)("which chromium")

function generateHtml(userName, score) {
    return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
                <style>
        .gfg {
            
            position: relative;
            margin: 0px;
            padding: 0px;

        }
  
        .first-txt {
            position: absolute;
            top: 200px;
            left: 160px;
            font-size: 40px;
            color: white;
        }
  
        .second-txt {
            position: absolute;
            bottom: 190px;
            left: 200px;
            font-size: 40px;
            color: white;
        }
    </style>
            </head>
            <body style="margin: 0; padding: 0">
                <div style="background-color: blue; height: 100vh; width: 100vw; display: flex; flex-direction: column">
                    <div class="gfg" >
                        <img src="https://i.ibb.co/yFC2YmK/nft.png" alt="nft" border="0" style="width: 100%; margin: auto;">
                        <h3 class="first-txt">
                            ${userName}
                        </h3>
                        <h3 class="second-txt">
                            ${score}
                        </h3>
                    </div>
                </div>
            </body>
        </html>  
    `;
}

async function mintNftController( request, response) {
    const {userName, score} = request.body
   const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'], executablePath: chromiumPath.trim() });
    const page = await browser.newPage();
    await page.setViewport({
        width: 480,
        height: 760,
        deviceScaleFactor: 1,
    });
    await page.setContent(generateHtml(userName, score));
    await page.screenshot({ path: `./${userName}.png` });
    await browser.close();

   

    const keypair = Keypair.fromSecretKey(
        new Uint8Array([228,252,71,40,185,159,47,71,216,100,105,210,198,177,136,23,156,85,116,180,244,136,78,111,147,165,42,19,142,251,166,57,156,134,203,201,6,226,141,186,150,111,175,216,215,12,187,37,64,89,89,183,176,30,145,221,62,200,119,134,66,33,135,43])
    );
    console.log(keypair.publicKey)

    const connection = new Connection(clusterApiUrl("devnet"));
    const metaplex = Metaplex.make(connection).use(keypairIdentity(keypair)).use(bundlrStorage({
        address: 'https://devnet.bundlr.network',
        providerUrl: 'https://api.devnet.solana.com',
        timeout: 60000,
    }))
    const imageBuffer = fs.readFileSync(`/Users/mayankjha/Credable/Credable-backend/${userName}.png`);
    const file = toMetaplexFile(imageBuffer, "mankey.png");

    const { uri, metadata } = await metaplex.nfts().uploadMetadata({
        name: "Kredible Score NFT",
        image: file,
    },
    { commitment: "finalized" }
    );
    response.status(200).send("POST request received")
    
    console.log(metadata.image) // https://arweave.net/123
    console.log(uri)

   
        const { nft } = await metaplex.nfts().create(
            {
                uri: uri,
                name: "Kredible score",
                sellerFeeBasisPoints: 500, // Represents 5.00%.
                maxSupply: 1,
            },
            { commitment: "finalized" }
        );
        console.log(nft);
}

async function calculateScore(request, response) {
  const {walletAddress} = request.body
  console.log(walletAddress) 
    /* let floorPrice = 0
    let nftValue = 0
    let totalTxs = 0
    const walletAddress = "5PTzRVufPqm3M3xTxq2AAkPhq1XxhmrW6LgQBunxJFvS" 

    const getNfts = async () => {

        let totalFloor = 0

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

        async function getTotalFloor() {

            
            const Nft_array_length = nftData.data.length

            try {
                for (let i = 0; i < 1; i++) {
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
                  console.log(nftValue);
                  totalFloor += nftValue; 
                  } else{
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
    nftValue = await getNfts()
    console.log(nftValue)
    

    const getTransactions = async () => {
        const endpoint = "https://solana-mainnet.g.alchemy.com/v2/FG8gabHTRpZujrxEb_rQKlldhhXftzlK" ;
        const solanaConnection = new solanaWeb3.Connection(endpoint);
        const pubKey = new solanaWeb3.PublicKey(walletAddress);

        let transactionList = await solanaConnection.getSignaturesForAddress(pubKey,);``
        return transactionList
      }
      totalTxs = await getTransactions()
      console.log(totalTxs)
      console.log(totalTxs.length)

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
        const len = tokenList.data.length
        console.log(len)
        
        return tokenList
      }
      let allTokens = await getAllTokens()
    
      async function getFungibleTokens() {
        const getNfts = async () => {

    
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
            const nftData = nfts.data.data

            console.log(nftData.length)

            return nftData
        }

        const nftData = await getNfts()

        for (let i = 0; i < nftData.length; i++) {
          let aObj = nftData[i];

          for (let j = 0; j < allTokens.data.length; j++){
            if (allTokens.data[j].mint === aObj.nftMint) {
                allTokens.data.splice(j,1)
                break;
            }
          }
        }
      
        return allTokens;
      }

      let tokens = await getFungibleTokens()
      console.log(tokens.data.length)

      async function getTokenValue(){

        let totalvalue = 0

        try {
            for (let i = 0; i <  tokens.data.length; i++) {
                let mintAddress = tokens.data[i].mint
                console.log(mintAddress)
                const options = {
                    method: 'POST',
                    url: 'https://rest-api.hellomoon.io/v0/token/price',
                    headers: {
                      accept: 'application/json',
                      'content-type': 'application/json',
                      authorization:   'Bearer f9322af6-68dd-4cce-a894-76bf23a0a005'
                    },
                    data: { mint: mintAddress }
                  };
                
                  const tokenPrice  = await axios.request(options);

                  if (tokenPrice.data.data[0]) {
                    if (mintAddress === "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v" || mintAddress == "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB" ) {
                        console.log(tokens.data[i].amount)
                        totalvalue += tokens.data[i].amount / 1000000
                    }
                    totalvalue += (tokenPrice.data.data[0].price / 1000000000000000) * tokens.data[i].amount
                    console.log(totalvalue)
                  } else {
                    totalvalue += 0
                  }



            }
        } catch (error) {
            console.log(error)
        } 

        console.log(totalvalue)

        return totalvalue
      }

      let tokenValue = await getTokenValue()

      console.log(tokenValue)

      async function getStakeAccountInfo(){
        const options = {
            method: 'POST',
            url: 'https://rest-api.hellomoon.io/v0/defi/staking/accounts',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              authorization:   'Bearer f9322af6-68dd-4cce-a894-76bf23a0a005'
            },
            data: { stakeAuthority: "2zyA1kf28Dh8sv3pLJ47ioBygC4tP95x9hNYMzpiay4n" }
          };
        
          const stakeAccounts  = await axios.request(options)
          console.log(stakeAccounts.data.data)
      }

      let stakeAccInfo = await getStakeAccountInfo()
      console.log(stakeAccInfo) */

      /* async function lendingHistoryInfo (){
        const lenderWallet = "8quVxKzc21GybehhMKwhiuuVks9eg1carGoBUuqpZJ1a"

        const sharkyLoans = {
            method: 'POST',
            url: 'https://rest-api.hellomoon.io/v0/sharky/loan-events',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              authorization:   'Bearer f9322af6-68dd-4cce-a894-76bf23a0a005'
            },
            data: { lender: lenderWallet }
          };
          const sharkyLendingHistory = await axios.request(sharkyLoans)
          console.log(sharkyLendingHistory.data.data)

          const citrusLoans = {
            method: 'POST',
            url: 'https://rest-api.hellomoon.io/v0/sharky/loan-events',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              authorization:   'Bearer f9322af6-68dd-4cce-a894-76bf23a0a005'
            },
            data: { lender: lenderWallet }
          };
          const citrusLendingHistory = await axios.request(citrusLoans)
          console.log(citrusLendingHistory.data.data)
      }
      lendingHistoryInfo()
 */
    response.status(200).send(`POST request received ${walletAddress}`)

      async function borrowingHistoryInfo (){
        const borrowerWallet = "8quVxKzc21GybehhMKwhiuuVks9eg1carGoBUuqpZJ1a"

        const sharkyLoans = {
            method: 'POST',
            url: 'https://rest-api.hellomoon.io/v0/sharky/loan-events',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              authorization:   'Bearer f9322af6-68dd-4cce-a894-76bf23a0a005'
            },
            data: { borrower: borrowerWallet }
          };
          const sharkyBorrowingHistory = await axios.request(sharkyLoans)
          console.log(sharkyBorrowingHistory.data.data)

           const citrusLoans = {
            method: 'POST',
            url: 'https://rest-api.hellomoon.io/v0/sharky/loan-events',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              authorization:   'Bearer f9322af6-68dd-4cce-a894-76bf23a0a005'
            },
            data: { borrower: borrowerWallet }
          };
          const citrusBorrowingHistory = await axios.request(citrusLoans)
          console.log(citrusBorrowingHistory.data.data)
      }
      console.log(borrowingHistoryInfo())
}



app.use(cors())
app.use(express.json())

app.post('/calculateScore',
calculateScore)

app.post('/mintnft',
    mintNftController)

app.listen(PORT, () =>console.log("da local host is alive"))