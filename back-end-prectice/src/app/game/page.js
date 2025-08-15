"use client"
import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Clock from '../components/Clock'
import Won from '../components/Won'
import GameButtons from '../components/GameButtons'
import Loose from '../components/Loose'

const Game = () => {

  const router = useRouter()
  const [data, setData] = useState([])
  const [loading, setloading] = useState(false)
  const [visible, setVisible] = useState(true)
  const [YouWon, setWon] = useState(false)
  const [YoueLoose, setLoose] = useState(false)
  const [blured, setBlured] = useState(true)
  let answer = false;

  const Quite = () => {
    router.push("/main")
  }



  const Next = () => {
    setBlured(true)
    if (YouWon) {
      setWon(false)
    }
    else {
      setLoose(false)
    }

    getPokemon()

  }

  const getPokemon = useCallback(async () => {
    setloading(true)
    try {
      const res = await fetch("/api/game/getpokemon")
      const data = await res.json()

      setData(data)
      console.log(data)
      setTimeout(() => {
        setloading(false)
      }, 3000);

    } catch (error) {
      console.error("fetch failed", error)
    }



  }, [])


  const wonOrLose = (code) => {
    if (code == 1) {
      answer = true
    }
    else {
      answer = false
    }
  }

  const callbackFromClock = useCallback((bolean) => {
    setTimeout(() => {
      if (answer == true) {

        fetch('/api/game/addPokemon', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            coustome_id: data[0].coustome_id
          })


        })
          .then(res => res.json())
          .then(data => {
            
              setWon(true)
           
          })
      }
      else {
        setLoose(true)
      }
    }, 1000);
    setBlured(false)

  })

  const start = () => {
    setVisible(false)
    getPokemon()
  }


  return (
    <>

      <div className='relative bg-[url(https://i.pinimg.com/736x/a7/28/3d/a7283d0be1ea71142e4d92d189299a32.jpg)] h-screen flex flex-col items-center bg-cover bg-no-repeat   text-white'>
        {/* <Navbar /> */}
        {YouWon &&
          <div className=' absolute z-40 text-black rounded-2xl  flex flex-col items-center gap-4 px-  transform]'>
            <div className='object-cover w-screen absolute h-[100vh] top-[-1] -z-5 opacity-55 bg-black' >

            </div>
            <Won arrayOfData={[data[0]]} />
            <div>

              <button className='bg-green-400 mx-3 text-white border-green-800 p-2 text-3xl hover:bg-green-600 border-2 rounded-lg ' onClick={() => Next()}>Next</button>
              <button className='bg-red-600 text-white border-red-800 p-2 text-3xl  hover:bg-red-700 border-2 rounded-lg ' onClick={() => Quite()}>Quite</button>

            </div>
          </div>

        }
        {YoueLoose &&
          <div className=' absolute z-40 text-black rounded-2xl  flex flex-col items-center gap-4 px-  transform]'>
            <div className='object-cover w-screen absolute h-[100vh] top-[-1] -z-5 opacity-55 bg-black' >

            </div>
            <Loose />
            <div>

              <button className='bg-green-500 text-white border-green-800 hover:bg-green-600 p-2 text-3xl border-2 rounded-lg ' onClick={() => Next()}>Next</button>
              <button className='bg-red-600 text-white border-red-800 p-2 text-3xl hover:bg-red-700 border-2 rounded-lg ' onClick={() => Quite()}>Quite</button>

            </div>
          </div>

        }
        {visible &&
          <div className='border absolute bg-white text-black rounded-2xl left-[50%] top-[50%] flex flex-col items-center gap-4 p-3 translate-y-[-50%] transform translate-x-[-50%]'>

            <div className='text-5xl font-bold'>
              Welcome lets get Started
            </div>
            <div>

              <button className='bg-green-500 text-white border-green-800 p-2 text-3xl border-2 rounded-lg ' onClick={() => start()}>Start</button>
            </div>
          </div>
        }
        {
          (!visible && !loading) && data.length > 0 ? 



          <div className={`w-[70%] m-auto  border flex items-center justify-center `}>

            {(!YouWon && !YoueLoose) && !loading &&
              <Clock callback={callbackFromClock} />
            }
            <div className='w-full flex flex-col items-center  relative'>


              <div className='absolute   p-1 text-2xl top-0 right-0'>
                <button>

                  <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-bulb"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7" /><path d="M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3" /><path d="M9.7 17l4.6 0" /></svg>
                </button>
              </div>
             
         <img src={data[0].img} alt="img" className={`object-contain1 transform transition-all duration-1000 ${blured ? "brightness-0 " : "brightness-100"}`} />
          

            </div>
            <div className='w-full m-auto '>
             
                 <GameButtons data={data} callback={wonOrLose} /> 
            </div>
              


          </div> : !visible ? 
          <div><img src="loading-img.gif" alt="loading.." className='rounded-full absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]'/></div>
          :null
              
        }

      </div>

    </>
  )
}

export default Game