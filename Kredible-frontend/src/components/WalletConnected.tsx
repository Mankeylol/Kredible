import React from 'react'
import ScoreCard from './ScoreCard'
import Dashboard from './Dashboard'

export default function WalletConnected() {
  return (
    <>
    <div className=' flex justify-between mt-[20px] pl-[60px] pr-[80px]'>
    <div>
    <h1 className='text-[42px] font-bold mb-[3rem]'>Your Dashboard</h1>
    <ScoreCard />
    </div>

    <Dashboard/>
    </div>
    </>
  )
}
