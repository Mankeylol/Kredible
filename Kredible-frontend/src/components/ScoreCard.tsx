import { useWallet } from '@solana/wallet-adapter-react'
import React, { useState } from 'react'
import ShowWalletAddy from './ShowWalletAddy'
import axios from 'axios';






export default  function ScoreCard() {
    const wallet = useWallet()
    const { publicKey } = useWallet()
    const [score, setScore] = useState("???")

    async function onclick() {
        if (wallet.connected) {
            const getScore = {
                method: 'POST',
                url: 'https://kredible-backend-production.up.railway.app/calculateScore',
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json',
                },
                data: { walletAddress: publicKey!.toString()  }
            }
            const score = await axios.request(getScore)

            console.log(score)
            setScore(score.data)

        
        }

    }

    return (
        <>
            <div className=' nft-bg w-[425px] h-[540px] mr-[100px] flex flex-col items-center '  >
                <div className='flex items-center flex-row justify-between mt-[40px] w-[357px]'>
                    <div className='flex items-center space-x-4'>
                        <div className='rounded-full bg-white-icon stroke-grey-icon w-[28px] h-[28px] '>
                        </div>
                        <h2 className='text-sm'>{wallet.connected ? <ShowWalletAddy /> : "Wallet Address"}</h2>
                    </div>
                    <img className='' src="share-icon.png" alt="" />
                </div>
                <div className=' w-[357px] h-[260px] score-board rounded-md mt-8 flex flex-row justify-center items-center '>
                    <div>
                        <img src="meter.png" alt="" />
                        {wallet.connected ? <h2 className='text-[38px] absolute top-[450px] left-[235px]'>{score}</h2> : <h2 className='text-[38px] absolute top-[450px] right-[280px]'>769</h2>}
                        {wallet.connected ? <button onClick={onclick} className='bg-[#C35AFF] w-[108px] h-[32px] text-[14px] rounded-lg ml-[4.5rem]'>Get Score Now</button> : <></>}
                    </div>
                </div>
                <div className=' flex flex-col w-[357px] mt-[40px]'>
                    <div className='flex'>
                        <div className='w-[24px] h-[24px] bg-white-icon flex items-center justify-center rounded-md'>
                            <img src="./Summary.png" alt="" />
                        </div>
                        <h2 className='text-[14px] text-[#FF89E6]'>Get summary of your score</h2>
                    </div>
                    <div className='flex mt-2'>
                        <div className='w-[24px] h-[24px] bg-white-icon flex items-center justify-center rounded-md'>
                            <img src="Star 1.png" alt="" />
                        </div>
                        <h2 className='text-[14px] text-[#FF89E6]'>
                            View your past scores
                        </h2>
                    </div>
                </div>
                <div className='mt-6 flex flex-row justify-between w-[357px]'>
                    <div>
                        <img src="./Kredible.png" alt="" />
                    </div>
                    <div>
                        <h3 className='text-white-icon text-[12px]'> Last updated on</h3>
                        <h2 className='text-[18px] text-white'>14th April 2023</h2>
                    </div>
                </div>
            </div>
        </>
    )
}
