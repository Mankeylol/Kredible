import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram, Transaction, } from '@solana/web3.js';
import React, { FC, useCallback, useState } from 'react';
import * as buffer from "buffer";


window.Buffer = buffer.Buffer;

export interface IAppProps {
}
// Component not being used right now
export function App (props: IAppProps) {

    const { connection } = useConnection();
        const { publicKey, sendTransaction } = useWallet();
    const getScore = useCallback(async () => {
            if (!publicKey) throw new WalletNotConnectedError();
    
            // 890880 lamports as of 2022-09-01
            const lamports = await connection.getMinimumBalanceForRentExemption(0);
    
            const transaction = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: publicKey,
                    toPubkey: Keypair.generate().publicKey,
                    lamports,
                })
            );
    
            const {
                context: { slot: minContextSlot },
                value: { blockhash, lastValidBlockHeight }
            } = await connection.getLatestBlockhashAndContext();
    
            const signature = await sendTransaction(transaction, connection, { minContextSlot });
    
            await connection.confirmTransaction({ blockhash, lastValidBlockHeight, signature });
        }, [publicKey, sendTransaction, connection]);
  return (
    <div>
        <button> Mint NFT</button>
    </div>
  );
}
