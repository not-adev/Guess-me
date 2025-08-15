
import React from 'react'
import Navbar from '@/app/components/Navbar'
import UserHome from '@/app/components/UserHome'

const UserPage = () => {
 
  return (
    <div className='text-white bg-[url(https://i.pinimg.com/736x/7e/e6/c4/7ee6c4cd304a06ab677ea57f0d5a99cf.jpg)] min-h-screen bg-no-repeat bg-cover '>
      <Navbar />

      <div className='flex'>
        
        <div className='w-[100%] '><UserHome/></div>
      
      </div>
    </div>
  )
}

export default UserPage