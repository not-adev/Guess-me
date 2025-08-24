"use client"
import React, { useEffect } from 'react'
import Link from 'next/link'

const page = () => {
   
     
  return (
    <div className='bg-[rgba(32,31,49,1)] text-white flex flex-col items-center justify-center h-screen sm:px-11 '>
      
      <div className='bg-[rgba(35,35,53,.7)] md:text-base text-sm min-h-[90%] relative rounded-4xl items-center justify-between flex sm:w-[80%] w-full'>
        <div className='absolute  gap-y-4 flex flex-col w-full z-10  p-15'>
          <div className='text-5xl font-extrabold text-cente'>PvP </div>
          {/* <div className='text-2xl font-bold '>Rules</div> */}
          <div className='lg:w-[50%]'>When the admin starts the game, each player picks a Pokémon card from another room member they'd like to snatch if they win. If victorious, the chosen card is added to the winner’s collection and removed from the loser’s. Every round becomes a high-stakes battle of strategy and risk.</div>
          <div className='lg::w-[50%] mt-5'>
            <button className='border-2  cursor-pointer hover:scale-111 rounded-lg font-bold border-[#099924] px-2 py-1 text-2xl w-[200px] md:w-auto m-3 bg-[#099924]'><Link href={"multiplayer/createroom"}>Create room</Link> </button>
            <button className='border-2 cursor-pointer hover:scale-111  rounded-lg font-bold border-[#345ad8] px-2 py-1 text-2xl w-[200px] md:w-auto m-3 bg-[#345ad8]'><Link href={"multiplayer/joinroom"}>Join room</Link> </button>
          </div>
        </div>
        <div className="absolute top-0 right-0 bg-cover before:content-[''] before:bg-gradient-to-r before:from-[rgba(35,35,53,1)]  before:to-[rgba(35,35,53,0)] before:z-7 before:absolute before:top-0 before:left-0 before:w-[200px] before:h-full rounded-r-4xl w-full md:w-[600px] h-full"
        >
          <img src="https://i.pinimg.com/736x/eb/b6/4e/ebb64e165c9f669aa6a65ad4053f4c48.jpg" className="object-cover absolute top-0 right-0 h-full w-full opacity-20 rounded-r-2xl" alt="img" />
         
        </div>

      </div>
    </div>
  )
}

export default page