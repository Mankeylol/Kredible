import puppeteer from "puppeteer"
import { exec } from "node:child_process"
import { promisify } from "node:util"
import {
  Metaplex, toMetaplexFile, bundlrStorage,
  keypairIdentity,
} from "@metaplex-foundation/js";
import { Connection, clusterApiUrl, Keypair, } from "@solana/web3.js";
import fs from "fs"
import express from 'express'
import cors from 'cors'
import { MongoClient } from "mongodb";

import { getTransactions } from "./getTx.js";
import { getFloor } from "./getNftFloorBatched.js";
import { getStakeAccountInfo } from "./getStakingInfo.js";
import { lendingHistoryInfo } from "./GetlendingHistory.js";
import { borrowingHistoryInfo } from "./getBorrowingHistory.js";
import { getPrices } from "./getToken.js";
import { mintNft } from "./CreateNft.js";
import { getNftVolume } from "./getNftVolume.js";
import { uri } from "./mongoDb.js";
import { addDoc } from "./mongoDb.js";
import { getBorrowingActivity } from "./getDefiBorrowingHistory.js";



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

async function mintNftController(request, response) {
  const { userName, score } = request.body
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
    new Uint8Array([228, 252, 71, 40, 185, 159, 47, 71, 216, 100, 105, 210, 198, 177, 136, 23, 156, 85, 116, 180, 244, 136, 78, 111, 147, 165, 42, 19, 142, 251, 166, 57, 156, 134, 203, 201, 6, 226, 141, 186, 150, 111, 175, 216, 215, 12, 187, 37, 64, 89, 89, 183, 176, 30, 145, 221, 62, 200, 119, 134, 66, 33, 135, 43])
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

  const { walletAddress } = request.body

  const [totalTxs, nftValue, tokensValue, stakingInfo, amountLent, amountBorrowed, nftVolume, defiBorrowingHistory ] = await Promise.all([getTransactions(walletAddress),getFloor(walletAddress),getPrices(walletAddress), getStakeAccountInfo(walletAddress),lendingHistoryInfo(walletAddress),borrowingHistoryInfo(walletAddress), getNftVolume(walletAddress), getBorrowingActivity(walletAddress)])



  let score = 0;

  let txScore
  if (totalTxs <= 0) {

    txScore = 30

  } else if (totalTxs.length <= 200) {
    txScore = 30 + (totalTxs.length / 200) * 20;
  } else if (totalTxs.length <= 1000) {
    txScore = 50 + ((totalTxs.length - 200) / 800) * 30;
  } else if (totalTxs.length <= 2000) {
    txScore = 80 + ((totalTxs.length - 1000) / 1000) * 10;
  } else {
    txScore = 90;
  }
  score += txScore

  let nftScore = 0;

  if (nftValue <= 0) {
    nftScore = 34;
  } else if (nftValue <= 100) {
    nftScore = 34 + (nftValue / 100) * 30
  } else if (nftValue <= 1000) {
    nftScore = 64 + ((nftValue - 100) / 900) * 15
  } else if (nftValue <= 2000) {
    nftScore = 79 + ((nftValue - 1000) / 1000) * 21
  } else {
    nftScore = 100
  }
  score += nftScore

  let tokenscore = 0

  if (tokensValue <= 0) {
    tokenscore = 50
  } else if (tokensValue <= 1000) {
    tokenscore = 50 + (tokensValue / 1000) * 50
  } else if (tokensValue <= 5000) {
    tokenscore = 100 + ((tokensValue - 1000) / 4000) * 30
  } else if (tokensValue <= 50000) {
    tokenscore = 130 + ((tokensValue - 5000) / 45000) * 20
  } else {
    tokenscore = 150
  }
  score += tokenscore

  let stakeScore = 0
  if (stakingInfo <= 0) {
    stakeScore = 66
  } else if (stakingInfo <= 100) {
    stakeScore = 66 + (stakingInfo / 100) * 30
  } else if (stakingInfo <= 500) {
    stakeScore = 96 + ((stakingInfo - 100) / 400) * 30
  } else if (stakingInfo <= 2500) {
    stakeScore = 126 + ((stakingInfo - 500) / 2000) * 30
  } else if (stakingInfo <= 10000) {
    stakeScore = 156 + ((stakingInfo - 2500) / 7500) * 44
  } else {
    stakeScore = 200
  }

  score += stakeScore

  let lendingScore = 0;
  if (amountLent <= 0) {
    lendingScore = 54
  } else if (amountLent <= 200) {
    lendingScore = 54 + (amountLent / 200) * 50
  } else if (amountLent <= 1800) {
    lendingScore = 104 + ((amountLent - 200) / 2000) * 56
  } else {
    lendingScore = 160
  }

  score += lendingScore

  


  let borrowingScore = 0;

  if (amountBorrowed <= 0) {
    borrowingScore = 66
  } else if (amountBorrowed <= 300) {
    borrowingScore = 66 + (amountBorrowed / 300) * 50
  } else if (amountBorrowed <= 5000) {
    borrowingScore = 104 + ((amountBorrowed - 300) / 5000) * 84
  } else {
    borrowingScore = 200
  }

  score += borrowingScore

  score = Math.floor(score)

  console.log(score)
  const data = [totalTxs, nftValue, tokensValue, stakingInfo, amountLent, amountBorrowed, nftVolume, defiBorrowingHistory ]
  response.status(200).send(`POST request received${console.log(data)}`)

  async function storeData(){
    const client = new MongoClient(uri);
    try {
      await client.connect();
      await addDoc(client,{walletAddress: walletAddress, score: score, data:data
      })
  } catch (error) {
      console.error(error)
  } finally {
      await client.close()
  }
  }
  storeData()

  return score
}

app.use(cors())
app.use(express.json())

app.post('/calculateScore',
  calculateScore)

app.post('/mintnft',
  mintNftController)

  app.post('test', mintNft)

app.listen(PORT, () => console.log("da local host is alive"))