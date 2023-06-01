import axios from "axios";

export async function borrowingHistoryInfo (walletAddress){
    const borrowerWallet = "stoog8LBUSAsSqDN8y7LvCX22ZFonQVSHbhg9jNMS9s"

    let amountBorrowed = 0

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


      let sharkyData = sharkyBorrowingHistory.data.data

      for (let i = 0; i < sharkyData.length; i++) {
        if (sharkyData[i].actionType === 'take') {
            amountBorrowed += sharkyData[i].amountTaken
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
        data: { borrower: borrowerWallet }
      };
      const citrusBorrowingHistory = await axios.request(citrusLoans)

      let citrusData = citrusBorrowingHistory.data.data

      for (let i = 0; i < citrusData.length; i++) {
        if (citrusData[i].actionType === 'accept_request' || citrusData[i].actionType === 'accept_offer') {
          amountBorrowed += citrusData[i].principalAmount
        }
      }

      return amountBorrowed
  }

