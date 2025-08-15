"use client"
import React, { useCallback, useEffect, useState } from 'react'

const page = () => {
    const [data, setData] = useState([])
    const [blured, setBlured] = useState(true)
    const getPokemon = async () => {


        try {
            const res = await fetch("/api/game/getpokemon")
            const data = await res.json()
            setData(data)
            console.log(data)
        } catch (error) {
            console.error("fetch failed", error)
        }



    }
    return (
        <>

            {
                data.length <= 0 ?
                    <div className='border absolute bg-white text-black rounded-2xl left-[50%] top-[50%] flex flex-col items-center gap-4 p-3 translate-y-[-50%] transform translate-x-[-50%]'>

                        <div className='text-5xl font-bold'>
                            Welcome lets get Started
                        </div>
                        <div>

                            <button className='bg-green-500 text-white border-green-800 p-2 text-3xl border-2 rounded-lg ' onClick={() => getPokemon()}>Start</button>
                        </div>
                    </div>


                    :


                    <div className="w-[70%] m-auto  border flex items-center justify-center ">
                        <div className='w-full flex flex-col items-center  relative'>
                            {console.log("rendering for console")}
                            <div className='absolute   p-1 text-2xl top-0 right-0'>
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-bulb"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12h1m8 -9v1m8 8h1m-15.4 -6.4l.7 .7m12.1 -.7l-.7 .7" /><path d="M9 16a5 5 0 1 1 6 0a3.5 3.5 0 0 0 -1 3a2 2 0 0 1 -4 0a3.5 3.5 0 0 0 -1 -3" /><path d="M9.7 17l4.6 0" /></svg>
                                </button>
                            </div>

                            <img src={data[0].img} alt="img" className={`object-contain1 transform transition-all duration-1000 ${blured ? "brightness-0 " : "brightness-100"}`} />

                        </div>




                    </div>
            }
        </>
    )
}

export default page

    // for (let index = 0; index < pokemonTransfer.length; index++) {
                //     const e = pokemonTransfer[index];
                //     if (e._id == id) {
                //         for (let i = 0; i < e.snaching.length; i++) {
                //             const item = e.snaching[i];
                //             if (item._id == myid) {
                //                 console.log(item)
                //                 pokemonId.current = item.coustomeId
                //                 break
                //             }

                //         }
                //         break
                //     }

                // }
            //     const deleteRes = await fetch(
            //         `${process.env.NEXT_PUBLIC_DOMAIN}/api/multiplayer/deletePokemon`,
            //         {
            //             method: 'POST',
            //             headers: {
            //                 'Content-Type': 'application/json',
            //             },
            //             body: JSON.stringify({
            //                 coustomeId: pokemonId.current
            //             })


            //         }
            //     )
            //     const deleteResJ = await deleteRes.json()
            //     console.log(deleteResJ.message)
            //     console.log("pokemon id", pokemonId.current)
            //     const showcardDaata = [{ id: myid, pokemonId: pokemonId.current }]

            //     const ft = await fetch(
            //         `${process.env.NEXT_PUBLIC_DOMAIN}/api/multiplayer/showCard`,
            //         {
            //             method: 'POST',
            //             headers: {
            //                 'Content-Type': 'application/json',
            //             },
            //             body: JSON.stringify({
            //                 coustomeIds: showcardDaata
            //             })


            //         }
            //     )
            //     const ftJ = await ft.json()
            //     setCardtoshow(ftJ.array)
            //     setLoose(true)
            //     return
            // }


             //  fetch(
                        //         `${process.env.NEXT_PUBLIC_DOMAIN}/api/multiplayer/addPokmeon`,
                        //         {
                        //             method: 'POST',
                        //             headers: {
                        //                 'Content-Type': 'application/json',
                        //             },
                        //             body: JSON.stringify({
                        //                 pokemonArrray: myselection
                        //             })
            
            
                        //         }
                        //     )
                        //         .then((res) => res.json())
                        //         .then(data => console.log(data.message))
            
            
                        //     const ft = await fetch(
                        //         `${process.env.NEXT_PUBLIC_DOMAIN}/api/multiplayer/showCard`,
                        //         {
                        //             method: 'POST',
                        //             headers: {
                        //                 'Content-Type': 'application/json',
                        //             },
                        //             body: JSON.stringify({
                        //                 coustomeIds: myselection
                        //             })
            
            
                        //         }
                        //     )
                        //     const ftJ = await ft.json()
                        //     setCardtoshow(ftJ.data)
                        //     setWon(true)
            