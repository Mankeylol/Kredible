import axios from "axios";

const url = "https://rest-api.hellomoon.io/v0/defi/lending";

export async function getBorrowingActivity(walletAddress) {
    const { data } = await axios.post(
        url,
        {
            "userAccount": walletAddress
        },
        {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: "Bearer f9322af6-68dd-4cce-a894-76bf23a0a005",
            },
        }
    );

    let amountBorrowed = 0;
    let amountRepayed = 0;

    for (let i = 0; i < data.data.length; i++) {
        if (data.data[i].actionType === "borrow") {
            amountBorrowed += data.data[i].amount/1000000;
        } else if (data.data[i].actionType === "repay") {
            amountRepayed += data.data[i].amount/1000000;
        }
    }
    const borrwingData = {
        amountBorrowed,
        amountRepayed,
    }

    return borrwingData
}
