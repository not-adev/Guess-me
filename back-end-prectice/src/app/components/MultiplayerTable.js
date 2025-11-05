"use client"
import React, { useEffect, useState } from 'react'
import { useGroupMemberContext } from '../multiplayer/context/GroupMemberContext'
import Image from 'next/image'
import ImageTag from './ImageTag'


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

        <div className='bg-[rgba(32,31,49,1)] text-white flex flex-col items-center justify-center h-screen sm:px-11 '>

            <div className='bg-[rgba(35,35,53,.7)] md:text-base text-sm min-h-[90%] relative rounded-4xl items-center justify-between flex md:w-[90%] w-full'>

                <div className='absolute  gap-y-4 p-6 flex flex-col w-full z-10 '>

                    <div className='text-lg text-cente'>

                        <div className=' flex md:w-[40%] items-center justify-between'>
                            <div>Room Name</div>
                            <div>{groupName}</div>
                        </div>
                    </div>

                    <div className='md:w-[440px] relative w-[80%] text-gray-100   p-4 rounded-2xl md:h-[370px] h-[500px] m-auto md:m-0 text-center'>
                    {admin ?
                        <button onClick={() => Play()} className='absolute z-20  bottom-0 right-[-15%] rounded-lg bg-gray-500 text-white font-bold text-2xl p-2 '>Play</button>
                        : null
                    }
                        <div className='overflow-auto  md:h-[370px] h-[500px]'>

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


                                    <div key={index} className='relative my-5 z-10 group  rounded-2xl flex w-full items-center justify-center  text-xl h-[100px] ' >
                                        {/* <div className='z-10'>{S_no}</div> */}
                                        <div className='z-10'>{item.userName}</div>
                                        {/* <div className='z-10'>{item.admin ? "Admin" : "Player"}</div> */}
                                        <div className='absolute top-0 z-0 h-full overflow-hidden rounded-2xl w-full left-0 '>
                                            <ImageTag className='h-full object-center group-hover:scale-110 transition-all duration-300 group-hover:w-[500px] rounded-2xl w-full md:opacity-75 opacity-100     object-cover' src={Img} alt="img" />
                                        </div>
                                    </div>

                                )
                            })}
                        </div>
                    </div>

                </div>
                <div className="absolute    top-0 right-0 bg-cover before:content-[''] before:bg-gradient-to-r before:from-[rgba(35,35,53,1)]  before:to-[rgba(35,35,53,0)] before:z-7 before:absolute before:top-0 before:left-0 before:w-[200px] before:h-full rounded-r-4xl w-full md:w-[600px] h-full">
                    <ImageTag src="https://i.pinimg.com/736x/ae/8f/29/ae8f29addceffadef54ec1811deba7a3.jpg" className="object-cover absolute top-0 right-0 h-full w-full md:opacity-40 opacity-10 rounded-r-2xl" alt="img" />

                </div>

            </div>
        </div>
        // <div className='flex items-center text-white bg-[#0e0e0e] justify-center flex-col h-screen'>

        //     <div className='w-[70%] md:w-[50%] relative mt-auto p-3   m-auto flex items-center justify-center flex-col '>



        //         {
        //             loading ? <div>
        //                 < img src="/loading-img.gif" alt="loading.." className='rounded-full ' />
        //             </div > :

        //                 <div className=' relative w-full p-5 border '>
        //                     {admin ?
        //                         <button onClick={() => Play()} className='absolute z-20  bottom-6 right-2 rounded-lg bg-gray-500 text-white font-bold text-2xl p-2 '>Play</button>
        //                         : null
        //                     }
        //                     <div className='w-full sticky top-3 left-0 z-20 h-[50px] flex items-center justify-between'>
        //                         <div>Room Name</div>
        //                         <div>{groupName}</div>

        //                     </div>

        // <div className=' overflow-auto bg-black  px-4 rounded-2xl h-[450px]  text-center'>

        //     {allmembers.members.map((item, index) => {

        //         if (S_no % 5 == 0) {
        //             Img = "http://res.cloudinary.com/dcgquf0d0/image/upload/v1750943383/pokemons/slider-images/img5.jpg"
        //         }
        //         else if (S_no % 5 == 1) {
        //             Img = "https://i.pinimg.com/736x/c9/9c/63/c99c63629f68f08dbb395d2408d0342a.jpg"
        //         }
        //         else if (S_no % 5 == 2) {
        //             Img = "https://i.pinimg.com/1200x/f7/a9/fa/f7a9fa0244e97b8bfeac4e36f7609d35.jpg"
        //         }
        //         else if (S_no % 5 == 3) {
        //             Img = "https://i.pinimg.com/1200x/28/e0/83/28e083174e539c512906d610b6d28c00.jpg"
        //         }
        //         else if (S_no % 5 == 4) {
        //             Img = "https://i.pinimg.com/1200x/08/2d/3d/082d3d220e24fd61cca9034015b83942.jpg"
        //         }
        //         S_no++

        //         return (


        //             <div key={index} className='relative my-3 z-10 bg-black  rounded-2xl flex w-full items-center justify-between px-6 text-xl h-[100px] ' >
        //                 <div className='z-10'>{S_no}</div>
        //                 <div className='z-10'>{item.userName}</div>
        //                 <div className='z-10'>{item.admin ? "Admin" : "Player"}</div>
        //                 <div className='absolute top-0 z-0 w-full left-0 '>
        //                     <ImageTag className='h-[100px] object-center rounded-2xl w-full opacity-70 object-cover' src={Img} alt="img" />
        //                 </div>
        //             </div>

        //         )
        //     })}
        // </div>
        //                 </div>
        //         }

        //     </div>
        // </div>
    )
}

export default MultiplayerTable




