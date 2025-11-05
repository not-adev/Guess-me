import React from 'react'
// import Image from 'next/image'
import ImageTag from './ImageTag'

const Logintoast = ({ Image_url, message }) => {
  return (
    <div className='flex justify-around p-2 gap-2'>
      <ImageTag src={Image_url} alt="Image" className='h-[50] w-[50]'/>
      <div className='message '>{message} </div>
    </div>
  )
}

export default Logintoast