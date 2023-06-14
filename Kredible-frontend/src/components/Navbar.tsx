"use client"

import React from 'react'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useRouter } from 'next/navigation'



export default function Navbar() {
  const router = useRouter()
  return (
    <div className='flex flex-row justify-between p-4'>
      <img
        className=" ml-12"
        src="/Kredible.svg"
        alt="Your Company"
      />
      <div className="flex flex-row space-x-12 p-3">
          <ul className='cursor-pointer' onClick={() => router.push('/')}>Dashboard</ul>
          <ul className='cursor-pointer' onClick={() => router.push('/loans')}>Loans</ul>
          <ul className='cursor-pointer' onClick={() => router.push('/leaderboards')}>Leaderboards</ul>
      </div>
      <div>
        <div className='bg-gray-900 rounded-md'>
        <WalletMultiButton/>
        </div>
      </div>
    </div>
  )
}