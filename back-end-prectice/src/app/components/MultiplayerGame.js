"use client"
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Clock from '../components/Clock'
import Won from '../components/Won'
import { useSocketContext } from '../multiplayer/context/SocketContext'
import Multiplayerbutton from './Multiplayerbutton'
import { useGroupMemberContext } from '../multiplayer/context/GroupMemberContext'
import Loose from '../components/Loose'

const MultiplayerGame = ({ pokemonTransfer, myselection, callback }) => {
    const socket = useSocketContext()
    const router = useRouter()
    const { allmembers, setAllmembers } = useGroupMemberContext()
   
    const [showclock, setShowclock] = useState(true)
    const [data, setData] = useState([{ img: "", coustome_id: 0 }])
    const [loading, setloading] = useState(false)
    const [visible, setVisible] = useState(true)
    const [YouWon, setWon] = useState(false)
    const [YoueLoose, setLoose] = useState(false)
    const [blured, setBlured] = useState(true)
    const [cardtoshow, setCardtoshow] = useState([])
    const pokemonId = useRef("")

    {/*
        structure of timings 

        [
            {
                _id : aidfeohesnfo ,
                timing : 38683738938,
            },
            {
                _id : aidfeoedfesbc  ,
                timing : 38683738939,
            }
        ]
        
    */}
    const answer = useRef(false);
    const answerTimining = useRef(null)
    useEffect(() => {
        console.log(pokemonTransfer)
        console.log(myselection)
        const handleStart = async () => {
            console.log("tr of start game")
            setVisible(false)
            await getPokemon()
        }
        const handleWinner = ({ id }) => {
            console.log("TRwinner emit received ")
            console.log("id of winner ", id)
            let myid;
            socket.current.emit("giveId", {}, async (callback) => {
                myid = callback._id
                console.log(myid)
                if (myid != id) {
                    console.log("loose")
                    for (let index = 0; index < pokemonTransfer.length; index++) {
                        const e = pokemonTransfer[index];
                        console.log(e)
                        if (e._id == id) {
                            console.log(e._id)
                            for (let i = 0; i < e.snaching.length; i++) {
                                const item = e.snaching[i];
                                if (item._id == myid) {
                                    console.log(item)
                                    pokemonId.current = item.pokemonId
                                    break
                                }

                            }
                            break
                        }

                    }
                    console.log(pokemonId.current)
                    fetch(
                        `${process.env.NEXT_PUBLIC_DOMAIN}/api/multiplayer/deletePokemon`,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                coustomeId: pokemonId.current
                            })


                        }
                    )
                        .then((res) => res.json())
                        .then(data => console.log(data.message))
                    const showcardData = [{ id: myid, pokemonId: pokemonId.current }]
                    const ft = await fetch(
                        `${process.env.NEXT_PUBLIC_DOMAIN}/api/multiplayer/showCard`,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                coustomeIds: showcardData
                            })


                        }
                    )
                    const ftJ = await ft.json()
                    setCardtoshow(ftJ.data)
                    setLoose(true)
                }
                else {
                    console.log("adding")
                    fetch(
                        `${process.env.NEXT_PUBLIC_DOMAIN}/api/multiplayer/addPokemon`,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                pokemonArrray: myselection
                            })


                        }
                    )
                        .then((res) => res.json())
                        .then(data => console.log(data.message))

                    const ft = await fetch(
                        `${process.env.NEXT_PUBLIC_DOMAIN}/api/multiplayer/showCard`,
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                coustomeIds: myselection
                            })


                        }
                    )
                    const ftJ = await ft.json()
                    console.log(ftJ.data)
                    setCardtoshow(ftJ.data)
                    setWon(true)
                }
            })

        }
        socket.current.once("TRstartGame", handleStart)

        socket.current.once("TRisWinner", handleWinner)
        return () => {

            socket.current.off("TRstartGame", handleStart)
            socket.current.off("TRisWinner", handleWinner)

        }


    }, [])

    const start = () => {
        console.log("start called ")
        socket.current.emit("startGame", {})
    }

    const Quite = () => {
       setAllmembers({members : [] , pokemonData : []})
       router.push("/main")
       
    }



    const Next = () => {
        callback(1)

    }

    const getPokemon = useCallback(async () => {
        setloading(true)
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/game/getpokemon`);
            const data = await res.json();
            setData(data);
            console.log(data);
        } catch (error) {
            console.error("fetch failed", error);
        } finally {
            setTimeout(() => {
                setloading(false);
            }, 3000);
        }



    }, [])


    const callbackFromButoon = (code, time) => {
        if (code == 1) {
            answer.current = true
            answerTimining.current = time

        }
        else {
            answer.current = false
        }

    }

    const callbackFromClock = useCallback(() => {
        setBlured(false)
        setShowclock(false)
        if (answer.current == true) {
            console.log("emiting is winner")
            socket.current.emit("isWinner", { answerTimining: answerTimining.current })
        }
        else {
            socket.current.emit("loose", {})
        }
        console.log(answer.current, answerTimining.current)

    }, [])




    return (
        <>

            <div className='relative bg-[url(https://i.pinimg.com/736x/a7/28/3d/a7283d0be1ea71142e4d92d189299a32.jpg)] h-screen flex flex-col items-center bg-cover bg-no-repeat   text-white'>

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
                {YouWon &&
                    <div className=' absolute z-40 text-black rounded-2xl  flex flex-col items-center gap-4 px-  transform]'>
                        <div className='object-cover w-screen absolute h-[100vh] top-[-1] -z-5 opacity-55 bg-black' >

                        </div>


                        
                        <Won arrayOfData={cardtoshow} />




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

                {
                    loading &&
                    <div><img src="/public/loading-img.gif" alt="loading.." className='rounded-full absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]' /></div>
                }
                {data.length > 2 && !loading && !visible &&
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

                }




            </div>

        </>
    )
}

export default MultiplayerGame