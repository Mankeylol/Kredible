import React from 'react'

export default function Dashboard() {
  return (
    <>
      <div className='w-[900px] h-[640px] bg-[#281D31] rounded-[10px] flex justify-between pl-[40px] pr-[40px] pt-[60px] ml-[40px] mt-[15px]'>
        <div className='w-[20rem] h-[500px] bg-[#141419] rounded-[10px] pl-6 pt-8 pr-8'>
          <h1 className='text-[28px] font-bold'>My Loans</h1>
          <h3 className=' text-[14px] text-[#727275]'>Here are the NFTs you borrowed against. You must
            pay these in full by the expiration date.
          </h3>
          <h1 className='text-[18px] font-bold mt-8 text-[#B8B8BA]'>
            Total Active Loans
          </h1>
          <h1 className='text-[28px] font-bold mt-1'>69</h1>
          <h1 className='text-[18px] font-bold mt-8 text-[#B8B8BA]'>Total Borrowed</h1>
          <div className='flex items-center flex-row align-middle'>
            <img className='mt-1' src="sol-icon.png" alt="" />
            <h1 className='text-[28px] font-bold mt-1 ml-1'>134</h1>
          </div>
          <h1 className='text-[#B8B8BA] text-[15px] mt-1'>◎456.8764 in wallet</h1>

          <h1 className='text-[18px] font-bold mt-8 text-[#B8B8BA]'>Total Interest Owned</h1>

          <h1 className='text-[28px] font-bold mt-1'>◎ 24</h1>
        </div>
        <div className='w-[420px] h-[500px] bg-[#141419] rounded-[10px] pl-6 pt-8 pr-8'>
          <h1 className='text-[28px] font-bold'>Leaderboards</h1>
          <h3 className='text-[14px] text-[#727275]'>Here are the wallets those have highest Credit Score among the ecosystem. Ranks refresh every 1hour.</h3>
          <div className=' flex justify-center'>
            <h1 className='text-[24px]  mt-[100px]  border-2 border-[#3A234C] rounded-[10px] p-[20px]'>Coming Soon</h1>
          </div>
        </div>
      </div>

    </>
  )
}
