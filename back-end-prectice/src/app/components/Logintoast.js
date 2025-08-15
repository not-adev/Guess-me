import React from 'react'

const Logintoast = ({ img_url, message }) => {
  return (
    <div className='flex justify-around p-2 gap-2'>
      <img src={img_url} alt="img" className='h-[50] w-[50]'/>
      <div className='message '>{message} </div>
    </div>
  )
}

export default Logintoast