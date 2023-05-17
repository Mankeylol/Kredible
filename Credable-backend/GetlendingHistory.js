import axios from "axios";

 export async function lendingHistoryInfo (walletAddress){
    const lenderWallet = "shyijQq6dKnzPiJXRvqQh1EViKA53mkWst2q8iEcPz2"
    let amountLent = 0;
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

      let sharkyData = sharkyLendingHistory.data.data

      for (let i = 0; i < sharkyData.length; i++) {
        if (sharkyData[i].actionType === 'take') {
          amountLent += sharkyData[i].amountTaken
        }
      }
      const citrusLoans = {
        method: 'POST',
        url: 'https://rest-api.hellomoon.io/v0/citrus/loan-events',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          authorization:   'Bearer f9322af6-68dd-4cce-a894-76bf23a0a005'
        },
        data: { lender: lenderWallet }
      };
      const citrusLendingHistory = await axios.request(citrusLoans)
      console.log(citrusLendingHistory.data.data)

      let citrusData = citrusLendingHistory.data.data

      for (let i = 0; i < citrusData.length; i++) {
        if (citrusData[i].actionType === 'accept_request' || citrusData[i].actionType === 'accept_offer') {
          amountLent += citrusData[i].principalAmount
        }
      }

      return amountLent
  }