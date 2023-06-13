import React from 'react'
import ScoreCard from './ScoreCard'
import Dashboard from './Dashboard'

export default function WalletConnected() {
  return (
    <>
    <div className='ml-[60px] flex mt-[20px]'>
    <div>
    <h1 className='text-[42px] font-bold mb-[3rem]'>Your Dashboard</h1>
    <ScoreCard />
    </div>

    <Dashboard/>
    </div>
    </>
  )
}
