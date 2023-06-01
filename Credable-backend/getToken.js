import axios from "axios";

export async function getPrices (walletAddress) {

    let usdValue = 0;

    const coinIds = []

    const getAllTokens = async () => {

        const options = {
          method: 'POST',
          url: 'https://rest-api.hellomoon.io/v0/token/balances-by-owner',
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            authorization: 'Bearer f9322af6-68dd-4cce-a894-76bf23a0a005'
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

            let walletAddress = "5PTzRVufPqm3M3xTxq2AAkPhq1XxhmrW6LgQBunxJFvS"
    
          const options = {
            method: 'POST',
            url: 'https://rest-api.hellomoon.io/v0/nft/mints-by-owner',
            headers: {
              accept: 'application/json',
              'content-type': 'application/json',
              authorization: 'Bearer f9322af6-68dd-4cce-a894-76bf23a0a005'
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
    
          for (let j = 0; j < allTokens.data.length; j++) {
            if (allTokens.data[j].mint === aObj.nftMint) {
              allTokens.data.splice(j, 1)
              break;
            }
          }
        }
    
        return allTokens;
      }
    
      let tokens = await getFungibleTokens()
      console.log(tokens.data.length)

      for (let i = 0; i < tokens.data.length; i++) {
        coinIds.push(tokens.data[i].mint)
      }

    const currency = 'usd'

    const options = {
        method: 'GET',
      url: 'https://api.coingecko.com/api/v3/simple/token_price/solana',
      headers: {
        accept: 'application/json',
      },
      params: { contract_addresses:coinIds , vs_currencies: currency }
    }

     const price = await axios.request(options)


    for (const [key, value] of Object.entries(price.data)) {
        for (let i = 0; i < tokens.data.length; i++) {
            if (key == tokens.data[i].mint) {
                if (key == "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB" || key == "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v" ) {
                    usdValue += (tokens.data[i].amount/ 1000000) * value.usd 
                }
                usdValue += (tokens.data[i].amount/ 1000000000) * value.usd 
            }
            
        }
      }


console.log(usdValue);

    for (let i = 0; i < price.data.length; i++) {
        
    }
    return usdValue;
}
