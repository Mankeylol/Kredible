import React from 'react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'

export default function Navbar() {
  return (
    <div className='flex flex-row justify-between p-4'>
      <img
        className=""
        src="/Kredible.svg"
        alt="Your Company"
      />
      <div className="flex flex-row space-x-12 p-3">
          <ul className='cursor-pointer'>Loans</ul>
          <ul className='cursor-pointer'>Perks</ul>
          <ul className='cursor-pointer'>Leaderboards</ul>
      </div>
      <div>
        <div className='bg-gray-900 rounded-md'>
        <WalletMultiButton/>
        </div>
      </div>
    </div>
  )
}