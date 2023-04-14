import puppeteer from "puppeteer"
import * as dotenv from 'dotenv';
import { exec } from "node:child_process"
import { promisify } from "node:util"
import { Metaplex, toMetaplexFile,bundlrStorage,
    keypairIdentity, } from "@metaplex-foundation/js";
import { Connection, clusterApiUrl, Keypair } from "@solana/web3.js";
import fs from "fs"
import express from 'express'
import cors from 'cors'

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
        new Uint8Array(process.env.PRIVATE_KEY)
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
app.use(cors())
app.use(express.json())

app.post('/mintnft',
    mintNftController)

app.listen(PORT, () =>console.log("da local host is alive"))