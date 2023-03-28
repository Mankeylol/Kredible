import { WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram, Transaction } from '@solana/web3.js';
import React, { FC, useCallback, useState } from 'react';
import * as buffer from "buffer";
import { NftSVG } from './NftSVG';

window.Buffer = buffer.Buffer;


export default function GetScore() {
    const initialValue = "anon"
    const [username, setName] = useState(initialValue)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
        console.log(event.target);
      };
    
      
    const GetScore: FC = () => {
        const { connection } = useConnection();
        const { publicKey, sendTransaction } = useWallet();


        /*const getScore = useCallback(async () => {
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
        }, [publicKey, sendTransaction, connection]);*/
    
        return (
            <button  disabled={!publicKey} className="getDataBtn">
                Get score
            </button>
        );
    };
  return (
    <div className='credit-score-container'>
        <h3>Get your on-chain credit score</h3>
        <div className='main-container'>
        <NftSVG username ={username} score='721' />
        <div className='main-form'>
            <label htmlFor="name" className='label'>Name</label>
            <input type="text" onChange={handleChange} id='name' value={username}/>
            <GetScore/>
        </div>
        </div>
    </div>
  )
}
