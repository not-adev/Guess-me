"use client"
import React,{useState} from 'react'
import Multiplayerbutton from './Multiplayerbutton'
import Clock from './Clock'

const MultiplayerPlayScreen = ({callbackFromButoon ,showclock, data , callbackFromClock}) => {
    const [blured, setBlured] = useState(true)
  return (
   <div className={`w-[70%] m-auto  border flex items-center justify-center `}>
                          {showclock &&
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
  
                              <Multiplayerbutton data={data} callback={callbackFromButoon} />
                          </div>
  
  
  
                      </div>
  
  )
}

export default MultiplayerPlayScreen