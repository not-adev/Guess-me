"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Galary from './Galary'


const UserHome = () => {
    const [userData, setuserData] = useState([])
    const router = useRouter()
    const [loading, setLoading] = useState(true)
    const [regionUnlcked, setregionUnlcked] = useState(1)
    useEffect(() => {
        async function getdata() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/user/me`)
                const { data } = await res.json()
                const length = data.pokemon.length
                if (length >= 45) {
                    regionUnlcked(2)
                }
                else if (length >= 75) {
                    regionUnlcked(3)
                }
                else if (length >= 115) {
                    regionUnlcked(4)
                }
                else if (length >= 147) {
                    regionUnlcked(5)
                }
                else if (length >= 193) {
                    regionUnlcked(6)
                }
                else if (length >= 214) {
                    regionUnlcked(7)
                }
                else if (length >= 240) {
                    regionUnlcked(8)
                }
                else if (length >= 312) {
                    regionUnlcked(9)
                }
                setuserData(data)
            } catch (error) {
                alert("some error occured try again later")
                router.push(`${process.env.NEXT_PUBLIC_DOMAIN}/main`)
            }
            finally {

                setLoading(false)

            }


        }
        getdata()





    }, [])
    const log_out = () => {

    }



    return (
        <>

            {
                loading ?
                    <div>
                        < img src="loading-img.gif" alt="loading.." className='rounded-full absolute top-[50%] left-[50%] transform translate-x-[-50%] translate-y-[-50%]' />
                    </div > :
                    <div className='w-[100%]  p-5'>

                        <div className=' flex flex-col md:flex-row gap-6 pb-9 '>
                            <div className='flex  md:w-[20%] self-start gap-1 flex-col justify-center items-cente'>
                                <img src="/user.png" alt="img" className='h-[150px] w-[150px] border border-black rounded-xl invert-100 mt-3' />

                                <div className='w-[150px] text-4xl font-bold  text-center'>
                                    {userData.userName}
                                </div>
                            </div>
                            <div className='w-full md:pt-12  text-black  '>

                                <span className='bg-[#E9F2A2] rounded-lg px-3 ' >Total number of pokemon Catched :- {userData.pokemon.length}</span><br />
                                <span className='bg-green-400 pb-0.5 mt-3 rounded-lg px-3'>Region Uncloked :- {regionUnlcked}</span>
                            </div>
                        </div>

                        <Galary />



                    </div>
            }
        </>
    )
}

export default UserHome