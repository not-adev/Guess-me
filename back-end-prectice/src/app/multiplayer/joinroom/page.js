"use client"
import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { usePokemonContext } from '@/app/context/PokemonContext';
import { ToastContainer, toast } from 'react-toastify';
import { useGroupMemberContext } from '../context/GroupMemberContext'
import { useSocketContext } from '../context/SocketContext';
import Mulitplayer from '@/app/components/Mulitplayer';
const joinRoom = () => {
  let S_no = 0
  const [showgame, setShowgame] = useState(false)
  const socket = useSocketContext()
  const { pokemons, setPokemons } = usePokemonContext()
  const callToast = (e) => toast.error(e);
  const { allmembers, setAllmembers } = useGroupMemberContext()



  { /*
    strucute of setAllmembers  = 
    {
       members :  [
                    { _id : fadflsjflds , userName : "Arif"}
                    { _id : fdfdfhaoekw , userName : "Asif"}....

                  ]
      pokemonData : [
                      [ {first pokemon data} ,  { second poekomon data } .... ],   --> this data is according to fist user of member(index = 0)
                      [ { first pokemon data} ,{second pokemon data}.... ] , --> this data is acoording to the second user of member(index = 1) 
                      ......
                    ]
    
    
    }
  
  */

  }
  const [loading, setLoading] = useState(false)
  const [show, setshow] = useState(false)
  const [roomName, setRoomName] = useState("")

  useEffect(() => {
    socket.current = io(`${process.env.NEXT_PUBLIC_SOCKETCONNECTION}`)
    async function getpokemons() {

      const ft = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/game/displaypokemon`)
      const { data } = await ft.json()
      console.log(data)
      setPokemons(data)

      
    }
    getpokemons()

    socket.current.on("roomDeleted", ({ }) => {
      callToast("Admin deleted the rooom ")
      setshow(false)

    })
    socket.current.on("changeArray", ({ updated_Members, updated_pokemonData }) => {
      console.log("nwe joining")
      const allmembers = { members: updated_Members, pokemonData: updated_pokemonData }
      console.log("allmembers", allmembers)
      setAllmembers(allmembers)


    })
    socket.current.on("TRshowSelect", ({}) => {
      console.log("show start pannel")
      setShowgame(true)
    })

    console.log(pokemons)
    console.log(allmembers)
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [])

   function callbackFromMultiplayer(){
    setShowgame(false)
  }



  async function hadleRoomName(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const name = roomName
      name.trim()
      const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/multiplayer/getuserdata`);
      const resJ = await res.json();
      const userData = resJ.data;

      socket.current.emit("joinRoom", { data: userData, roomName: name, pokemonData: pokemons }, (callback) => {

        if (callback.members) {
          console.log(callback.members)
          const allmembers = { members: callback.members, pokemonData: callback.pokemonData }
          console.log(allmembers)
          setAllmembers(allmembers)
          setshow(true)

        }
        else {
          console.log("inside else")
          callToast("No room found with given name")
        }
      })

    } catch (error) {
      console.log(error.message)
      callToast("some error occured try again")
    }
    finally {
      setLoading(false)
    }
  }



  return (
    <div>
      {
        !show ?

          (<div>
            <form onSubmit={hadleRoomName}>
              <input onChange={(e) => setRoomName(e.target.value)} value={roomName} required type="text" placeholder='Enter Room name' />
              <button type='submit'>{loading ? "loading" : "Submit"}</button>
            </form>
          </div>)
          :
          showgame ? <Mulitplayer callback={callbackFromMultiplayer}/> :
            (<div className='flex items-center justify-center flex-col h-screen'>
              <div className='w-[70%] relative mt-auto p-3  m-auto flex items-center justify-center flex-col '>


                <div className='text-4xl font-bold m-8'>Your Room </div>
                <div className=' w-full m-4 flex items-end justify-around'>
                  <div>
                    Room Name

                  </div>
                  <div>{roomName}</div>
                </div>
                <div className='my-2.5'>IN Room </div>
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
              </div>
            </div>)
      }
      <div><ToastContainer /></div>
    </div>
  )
}

export default joinRoom