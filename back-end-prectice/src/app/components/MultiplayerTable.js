"use cliet"
import React, { useEffect, useState } from 'react'
import { useGroupMemberContext } from '../multiplayer/context/GroupMemberContext'



const MultiplayerTable = ({ Play, useEffectFuntion, groupName = "no group name", admin=false }) => {
    const { allmembers, setAllmembers } = useGroupMemberContext()
    const [loading, setloading] = useState(true)
    let S_no = 0
    useEffect(() => {
        async function setup() {
            setloading(true)
            await useEffectFuntion()
            setloading(false)

        }
        setup()

    }, []);

    return (
        <div className='flex items-center justify-center flex-col h-screen'>
            <div className='w-[70%] relative mt-auto p-3  m-auto flex items-center justify-center flex-col '>


                <div className='text-4xl font-bold m-8'>Your Room </div>
                <div className=' w-full m-4 flex items-end justify-around'>
                    <div>
                        Room Name

                    </div>
                    <div className='text-black'>{groupName}</div>
                </div>
                <div className='my-2.5'>IN Room </div>
                {
                    loading ? <div>
                        < img src="/loading-img.gif" alt="loading.." className='rounded-full ' />
                    </div > :

                        <table className='divide-y w-full divide-gray-200'>
                            <thead className='gap-2 bg-gray-800'>
                                <tr className='text-center'>
                                    <th className='px-6 py-3  text-xs font-medium text-white uppercase tracking-wider'>S.NO</th>
                                    <th className='px-6 py-3  text-xs font-medium text-white uppercase tracking-wider'>Name</th>
                                    <th className='px-6 py-3  text-xs font-medium text-white uppercase tracking-wider'>Admin/Player</th>
                                </tr>
                            </thead>
                            <tbody className='bg-white divide-y text-center divide-gray-200'>
                                {allmembers.members.map((item, index) => {
                                    S_no++
                                    return (
                                        <tr key={index}>
                                            <td className='px-6 py-4 whitespace-nowrap'>{S_no}</td>
                                            <td>{item.userName}</td>
                                            <td>{item.admin ? "Admin" : "Player"}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                }
                {admin ?

                    <button onClick={() => Play()} className='absolute top-0 right-0 border rounded-lg bg-red-600 text-white font-bold text-2xl px-2 py-1 '>Play</button>
                    : null
                }
            </div>
        </div>
    )
}

export default MultiplayerTable