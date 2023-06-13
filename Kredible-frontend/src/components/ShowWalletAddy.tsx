'use client'

import React from 'react'
import { useWallet } from '@solana/wallet-adapter-react';

const ShowWalletAddy = () => {

    // Get the original string
    const originalString = useWallet().publicKey!.toBase58();
  
    // Extract the first three letters
    const firstThreeLetters = originalString.substring(0, 3);
  
    // Extract the last three letters
    const lastThreeLetters = originalString.substring(originalString.length - 3);
  
    // Create the modified string with the first and last three letters
    const modifiedString = `${firstThreeLetters}...${lastThreeLetters}`;
  
    return (
      <p>{modifiedString}</p>
    );
  };

export default ShowWalletAddy
