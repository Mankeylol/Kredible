import React from 'react'
import ScoreCard from '@/components/ScoreCard'

export default function WalletNotConnected() {
  return (
    <>
     <div className=" mt-32 ml-16 flex flex-row justify-between">
            <div>
              <h1 className='text-3xl mt-20 font-bold'>
                Get your <span className='grad'>on-chain</span> Credit Score
              </h1>
              <h1 className='text-base font-bold'>with just 3 quick and simple steps</h1>
              <div className='mt-16 flex flex-col space-y-6'>
                <div className='flex'>
                  <img src="Group 89.png" alt="" />
                  <p className='ml-4 mt-2'>Connect your wallet</p>
                </div>
                <div className='flex'>
                  <img src="Group 83.png" alt="" />
                  <p className='ml-4'>Click a button on your Score Card</p>
                </div>
                <div className='flex'>
                  <img src="./score-svg.png" alt="" />
                  <p className='ml-4'>Get your on-chain score</p>
                </div>
              </div>
              <h2 className='text-[20px] font-bold mt-12'>Ready to see where your wallet stand among the ecosystem?</h2>
              <button className='h-[50px] w-[200px] mt-4 bg-[#C35AFF] text-white rounded-[10px]  mb-[250px]'>Get started</button>
            </div>
            <ScoreCard />
          </div>
    </>
  )
}
