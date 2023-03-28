import React from 'react'
import {
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';

export default function Navbar() {
  return (
  <>
  <div className='navbar'>
    <div>
        <h1 className='heading-text'>Incenti</h1>
    </div>

    <div className='wallet-btn'>
        <WalletMultiButton/>
    </div>
  </div>
  </>
  )
}
