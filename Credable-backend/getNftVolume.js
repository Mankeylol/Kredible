import axios from "axios"
export async function getNftVolume (walletAddress){

    let salesVolume = 0
    let buysVolume = 0
    let totalVolume = 0
    const sales = {
        method: 'POST',
        url: 'https://rest-api.hellomoon.io/v0/nft/sales/secondary',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: 'Bearer f9322af6-68dd-4cce-a894-76bf23a0a005'
        },
        data: { seller: walletAddress }
    }

    const salesData = await axios(sales)



    for (let i = 0; i < salesData.data.data.length; i++) {
        salesVolume += salesData.data.data[i].price
    }
    const buys = {
        method: 'POST',
        url: 'https://rest-api.hellomoon.io/v0/nft/sales/secondary',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization: 'Bearer f9322af6-68dd-4cce-a894-76bf23a0a005'
        },
        data: { buyer: walletAddress }
    }

    const buysData = await axios(buys)

    for (let i = 0; i < buysData.data.data.length; i++) {
        buysVolume += buysData.data.data[i].price
    }

    totalVolume = salesVolume + buysVolume
    
    console.log(totalVolume)

    return totalVolume
}