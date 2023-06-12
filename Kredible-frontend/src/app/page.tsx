'use client'
import ScoreCard from '@/components/ScoreCard'
import Navbar from '../components/Navbar'

export default function Home() {
  return (
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
              <h2 className='text-[20px] font-bold mt-32'>Ready to see where your wallet stand among the ecosystem?</h2>
            </div>
            <ScoreCard/>
          </div>
        </div>
      </main>
      <div >
        <div className='w-[400px] ml-[40px]'>
        <h1 className='text-[42px] font-bold'>Frequently Asked Questions
        </h1>
        </div>
      </div>
    </div>
  )
}
