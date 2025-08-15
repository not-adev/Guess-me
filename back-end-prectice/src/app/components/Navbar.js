"use client"
import Link from 'next/link'
import React from 'react'
import { useRouter } from 'next/navigation'


const Navbar = () => {
  const router = useRouter()

  async function logout() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/user/logout`)
    const resj = await res.json()
  }



  return (
    <nav className='flex items-center bg-[rgba(0,0,0,.6)] w-full font-bold gap-4 justify-between text-2xl sticky z-[2] py-3 top-0 px-14 '>
      <div>
        Guess Me !
      </div>
      <ul className='md:flex gap-6 items-center hidden  '>
        <li><Link href={`${process.env.NEXT_PUBLIC_DOMAIN}/main`}>Home</Link></li>
        <li>Modes</li>
        <li><Link href={`/user`}>Gallery</Link> </li>
        <li className='group'>
          <Link href={`${process.env.NEXT_PUBLIC_DOMAIN}/user`}>
            <img src="/user.png" alt="img" className='h-[30px] w-[30px] border border-black rounded-xl invert-100 my-3' />

          </Link>
          <button onClick={logout} className='hidden cursor-pointer group-hover:block group-hover:absolute border-2 bg-white text-black text-lg rounded-lg right-5 border-white font-semibold px-2'>
            Logout
          </button>
        </li>
        {/* <li className='border-2 rounded-lg border-white px-2 '>Log-out </li> */}
      </ul>
      <div className='relative md:hidden group cursor-pointer'>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon  icon-tabler icons-tabler-outline icon-tabler-menu-2"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M4 6l16 0" /><path d="M4 12l16 0" /><path d="M4 18l16 0" /></svg>

        <ul className='group-hover:flex cursor-pointer hidden flex-col items-center justify-center bg-black border rounded-lg p-1 -left-7  absolute'>
          <li className='hover:invert-20 invert-0 '>
            <Link href={`${process.env.NEXT_PUBLIC_DOMAIN}/user`}>

              <img src="user.png" alt="img" className='h-[30px] w-[30px] border border-black rounded-xl invert-100 my-3 ' />
              <div> </div>
            </Link>
          </li>
          <li className='hover:text-gray-500'><Link href={`${process.env.NEXT_PUBLIC_DOMAIN}/main`}>Home</Link></li>
          <li className='hover:text-gray-500'>Modes</li>
          <li className='hover:text-gray-500'><Link href={`${process.env.NEXT_PUBLIC_DOMAIN}/user`}>Gallery</Link> </li>
          <li>
            <button onClick={logout} className='border-2 text-lg hover:text-gray-500 cursor-pointer rounded-lg  right-5 font-semibold px-2'>
              Logout
            </button>
          </li>

        </ul>

      </div>


    </nav>

  )
}

export default Navbar