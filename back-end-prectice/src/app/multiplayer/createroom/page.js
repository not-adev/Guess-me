"use client"
import React, { useContext, useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import { useSocketContext } from '../context/SocketContext'
import { useGroupMemberContext } from '../context/GroupMemberContext'
import Mulitplayer from '@/app/components/Mulitplayer'

import { usePokemonContext } from '@/app/context/PokemonContext'
const createRoom = () => {
  let S_no = 0
  const { pokemons, setPokemons } = usePokemonContext()
  const [showgame, setShowgame] = useState(false)
  const [groupName, setGroupName] = useState([])

  const [loading, setloading] = useState(true)
  const { allmembers, setAllmembers } = useGroupMemberContext()
  // const [groupMembers, setGroupMembers] = useState({members : [] , pokemonData : []})
  const socket = useSocketContext()

  useEffect(() => {

    async function setup() {
      socket.current = io(`${process.env.NEXT_PUBLIC_SOCKETCONNECTION}`);

      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/multiplayer/getuserdata`);
        const resJ = await res.json();
        const userData = resJ.data;
        setGroupName(userData._id)
        const ft = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/game/displaypokemon`)
        const { data } = await ft.json()
        console.log(data)
        setPokemons(data)

        socket.current.emit("createRoom", { data: userData, pokemonData: data }, (callback) => {
          const allmembers = { members: callback.members, pokemonData: callback.pokemonData }
          console.log("allmemberss", allmembers)
          setAllmembers(allmembers)
        })

      } catch (error) {
        console.error("Error during setup:", error.message);
      }
      finally {
        setloading(false)
      }
    }

    setup();


    socket.current.on("changeArray", ({ updated_Members, updated_pokemonData }) => {
      console.log("nwe joining")
      const allmember = { members: updated_Members, pokemonData: updated_pokemonData }
      setAllmembers(allmember)

    })
    socket.current.on("TRshowSelect", ({}) => {
      setShowgame(true)
    })

    return () => {
      if (socket.current) {

        socket.current.disconnect();
      }
    };
  }, []);
  function callbackFromMultiplayer(){

  }
  function Play() {
    socket.current.emit("showSelect", {})
    // setShowgame(true)
  }


  return (
    <>{
      showgame ? <Mulitplayer callback={callbackFromMultiplayer}/> :

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
            <button onClick={() => Play()} className='absolute top-0 right-0 border rounded-lg bg-red-600 text-white font-bold text-2xl px-2 py-1 '>Play</button>
          </div>
        </div>
    }
    </>

  )
}

export default createRoom