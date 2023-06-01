import axios from "axios";


export async function getTokensPrice (walletAddress) {
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
    
      async function getTokenValue() {
    
        let totalvalue = 0
    
        try {
          for (let i = 0; i < tokens.data.length; i++) {
            let mintAddress = tokens.data[i].mint
            const options = {
              method: 'POST',
              url: 'https://rest-api.hellomoon.io/v0/token/price',
              headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                authorization: 'Bearer f9322af6-68dd-4cce-a894-76bf23a0a005'
              },
              data: { mint: mintAddress }
            };
    
            const tokenPrice = await axios.request(options);
    
            if (tokenPrice.data.data[0]) {
              if (mintAddress === "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v" || mintAddress == "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB") {
                console.log(tokens.data[i].amount)
                totalvalue += tokens.data[i].amount / 1000000
              }
              totalvalue += (tokenPrice.data.data[0].price / 1000000000000000) * tokens.data[i].amount
            } else {
              totalvalue += 0
            }
    
    
    
          }
        } catch (error) {
          console.log(error)
        }
    
        return totalvalue
      }
    
      let tokenValue = await getTokenValue()

      return tokenValue
}