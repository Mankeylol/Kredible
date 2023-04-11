import puppeteer from "puppeteer"
import { exec } from "node:child_process"
import { promisify } from "node:util"



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

async function main() {
    const [, , userName, score, imageUrl] = process.argv;
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'], executablePath: chromiumPath.trim() });
    const page = await browser.newPage();
    await page.setViewport({
        width: 480,
        height: 760,
        deviceScaleFactor: 1,
    });
    await page.setContent(generateHtml(userName, score, imageUrl));
    await page.screenshot({ path: `./${userName}.png` });
    await browser.close();
}

main();