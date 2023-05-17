import puppeteer from "puppeteer"
import { exec } from "node:child_process"
import { promisify } from "node:util"
import {
  Metaplex, toMetaplexFile, bundlrStorage,
  keypairIdentity,
} from "@metaplex-foundation/js";
import { Connection, clusterApiUrl, Keypair,} from "@solana/web3.js";
import fs from "fs"
import express from 'express'
import cors from 'cors'

import { getNfts } from "./getNftFloor.js";
import { getTransactions } from "./getTx.js";
import { getTokensPrice } from "./getTokensValue.js";
import { getStakeAccountInfo } from "./getStakingInfo.js";
import { lendingHistoryInfo } from "./GetlendingHistory.js";
import { borrowingHistoryInfo } from "./getBorrowingHistory.js";



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


  console.log(walletAddress)

  let totalTxs = await getTransactions(walletAddress)
  console.log(totalTxs)
  console.log(totalTxs.length)

  const nftValue = await getNfts(walletAddress)
  console.log("final NFTs value", nftValue)

  let tokensValue = await getTokensPrice(walletAddress)

  console.log(tokensValue)

  let stakingInfo = getStakeAccountInfo(walletAddress)
  console.log(stakingInfo)

  let amountLent = await lendingHistoryInfo()
  console.log(amountLent)

  let amountBorrowed = await borrowingHistoryInfo(walletAddress)

  console.log(amountBorrowed)

  response.status(200).send(`POST request received`)
}

app.use(cors())
app.use(express.json())

app.post('/calculateScore',
  calculateScore)

app.post('/mintnft',
  mintNftController)

app.listen(PORT, () => console.log("da local host is alive"))