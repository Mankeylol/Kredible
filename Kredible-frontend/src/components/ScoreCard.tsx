import React from 'react'

export default function ScoreCard() {
    return (
        <>
            <div className=' nft-bg w-[425px] h-[540px] mr-[100px] flex flex-col items-center '  >
                <div className='flex items-center flex-row justify-between mt-[40px] w-[357px]'>
                    <div className='flex items-center space-x-4'>
                        <div className='rounded-full bg-white-icon stroke-grey-icon w-[28px] h-[28px] '>
                        </div>
                        <h5 className='text-sm'>Wallet Address</h5>
                    </div>
                    <img className='' src="share-icon.png" alt="" />
                </div>
                <div className=' w-[357px] h-[260px] score-board rounded-md mt-8 '>
                    <div className='progressbar' role='progressbar' aria-valuenow={757} aria-valuemin={300} aria-aria-valuemax={900}>
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
