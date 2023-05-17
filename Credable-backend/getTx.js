import solanaWeb3 from '@solana/web3.js';

export const getTransactions = async (walletAddress) => {
    const endpoint = "https://solana-mainnet.g.alchemy.com/v2/FG8gabHTRpZujrxEb_rQKlldhhXftzlK";
    const solanaConnection = new solanaWeb3.Connection(endpoint);
    const pubKey = new solanaWeb3.PublicKey(walletAddress);

    let transactionList = await solanaConnection.getSignaturesForAddress(pubKey); 
    return transactionList
  }