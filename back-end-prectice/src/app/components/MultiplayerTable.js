"use cliet"
import React, { useEffect, useState } from 'react'
import { useGroupMemberContext } from '../multiplayer/context/GroupMemberContext'



const MultiplayerTable = ({ Play, useEffectFuntion, groupName = "no group name", admin = false }) => {
    const { allmembers, setAllmembers } = useGroupMemberContext()
    const [loading, setloading] = useState(true)
    let S_no = 0
    let Img = ""

    useEffect(() => {
        async function setup() {
            setloading(true)
            await useEffectFuntion()
            setloading(false)

        }
        setup()


    }, []);

    return (
        <div className='flex items-center text-white bg-[#0e0e0e] justify-center flex-col h-screen'>

            <div className='w-[70%] md:w-[50%] relative mt-auto p-3   m-auto flex items-center justify-center flex-col '>

                {/* <div className='w-full sticky top-3 left-0 z-20 h-[50px] bg-[rgba(0,0,0,.5)] flex items-center justify-between'>
                    <div>Room Name</div>
                    <div>{groupName}</div>

                </div> */}

                {
                    loading ? <div>
                        < img src="/loading-img.gif" alt="loading.." className='rounded-full ' />
                    </div > :

                        <div className=' relative w-full p-5 border '>
                            {admin ?
                                <button onClick={() => Play()} className='absolute z-20  bottom-6 right-2 rounded-lg bg-gray-500 text-white font-bold text-2xl p-2 '>Play</button>
                                : null
                            }
                            <div className='w-full sticky top-3 left-0 z-20 h-[50px] flex items-center justify-between'>
                                <div>Room Name</div>
                                <div>{groupName}</div>

                            </div>

                            <div className=' overflow-auto bg-black  px-4 rounded-2xl h-[450px]  text-center'>

                                {allmembers.members.map((item, index) => {

                                    if (S_no % 5 == 0) {
                                        Img = "http://res.cloudinary.com/dcgquf0d0/image/upload/v1750943383/pokemons/slider-images/img5.jpg"
                                    }
                                    else if (S_no % 5 == 1) {
                                        Img = "https://i.pinimg.com/736x/c9/9c/63/c99c63629f68f08dbb395d2408d0342a.jpg"
                                    }
                                    else if (S_no % 5 == 2) {
                                        Img = "https://i.pinimg.com/1200x/f7/a9/fa/f7a9fa0244e97b8bfeac4e36f7609d35.jpg"
                                    }
                                    else if (S_no % 5 == 3) {
                                        Img = "https://i.pinimg.com/1200x/28/e0/83/28e083174e539c512906d610b6d28c00.jpg"
                                    }
                                    else if (S_no % 5 == 4) {
                                        Img = "https://i.pinimg.com/1200x/08/2d/3d/082d3d220e24fd61cca9034015b83942.jpg"
                                    }
                                    S_no++

                                    return (


                                        <div key={index} className='relative my-3 z-10 bg-black  rounded-2xl flex w-full items-center justify-between px-6 text-xl h-[100px] ' >
                                            <div className='z-10'>{S_no}</div>
                                            <div className='z-10'>{item.userName}</div>
                                            <div className='z-10'>{item.admin ? "Admin" : "Player"}</div>
                                            <div className='absolute top-0 z-0 w-full left-0 '>
                                                <img className='h-[100px] object-center rounded-2xl w-full opacity-70 object-cover' src={Img} alt="img" />
                                            </div>
                                        </div>

                                    )
                                })}
                            </div>
                        </div>
                }

            </div>
        </div>
    )
}

export default MultiplayerTable