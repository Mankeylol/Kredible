'use client'

import { useWallet } from '@solana/wallet-adapter-react'

import Navbar from '../components/Navbar'
import { Wallet } from '@/components/Wallet'
import WalletConnected from '@/components/WalletConnected'
import WalletNotConnected from '@/components/WalletNotConnected'

export default function Home() {
  const wallet = useWallet()
  
  return (
    <>
    <div className="bg-[#14141A]">
      <main>
        <div className="relative isolate overflow-hidden">

          <div
            className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(20%-30rem)] lg:left-48 lg:top-[calc(50%-40rem)] xl:left-[calc(50%-50rem)]"
            aria-hidden="true"
          >
            <div
              className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#59205C] to-[#14141A] opacity-90 absolute"
              style={{
                clipPath:
                  'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
              }}
            />
          </div>
          <div className="">
            <Navbar />
          </div>
         {wallet.connected ? <WalletConnected /> : <WalletNotConnected />}
        </div>
      </main>
      <div >
        <div className='w-[400px] ml-[40px]'>
          <img className='absolute top[850px] right-0' src="circle-kredible.png" alt="" />
          <h1 className='text-[42px] font-bold'>Frequently Asked Questions
          </h1>
        </div>
        <div className=' flex justify-center'>
          <h1 className='text-[36px]  mt-[100px] ml-[40px] border-2 border-[#3A234C] rounded-[10px] p-[40px]'>Coming Soon!</h1>
        </div>
      </div>
    </div>
    </>
  )
}
