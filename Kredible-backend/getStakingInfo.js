import axios from "axios";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export async function getStakeAccountInfo(walletAddress) {
    const options = {
      method: 'POST',
      url: 'https://rest-api.hellomoon.io/v0/defi/staking/accounts',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Bearer f9322af6-68dd-4cce-a894-76bf23a0a005'
      },
      data: { stakeAuthority: "2zyA1kf28Dh8sv3pLJ47ioBygC4tP95x9hNYMzpiay4n" }
    };

    const stakeAccounts = await axios.request(options)
    let stakeArray = stakeAccounts.data.data
    let len = stakeArray.length
    let stakeValue = 0

    for (let i = 0; i < len; i++) {
      let aObj = stakeArray[i];
      
      stakeValue += aObj.balance / LAMPORTS_PER_SOL
    
    }
    console.log(stakeValue)
    return stakeValue
  }