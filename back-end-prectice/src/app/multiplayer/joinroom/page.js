"use client"
import React, { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
import { usePokemonContext } from '@/app/context/PokemonContext';
import { ToastContainer, toast } from 'react-toastify';
import { useGroupMemberContext } from '../context/GroupMemberContext'
import { useSocketContext } from '../context/SocketContext';
import Mulitplayer from '@/app/components/Mulitplayer';
import MultiplayerTable from '@/app/components/MultiplayerTable';
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
  const [emiting, setemiting] = useState(false)

  async function setup() {
    if(!emiting){
      return
    }
    const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/multiplayer/getuserdata`);
    const resJ = await res.json();
    const userData = resJ.data;
    console.log(userData)
    const ft = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/game/displaypokemon`)
    const { data } = await ft.json()
    setPokemons(data)
    console.log(data)
    socket.current.emit("joinRoom", { data: userData, roomName:"nothing", pokemonData: data })
  }


  useEffect(() => {
    socket.current = io(`${process.env.NEXT_PUBLIC_SOCKETCONNECTION}`)
    async function getpokemons() {
      const ft = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/game/displaypokemon`)
      const { data } = await ft.json()
   
      setPokemons(data)
    }
    getpokemons()

    socket.current.on("roomDeleted", ({ }) => {
      callToast("Admin deleted the rooom ")
      console.log("Admin deleted the rooom")
      socket.current.emit("TRroomDeleted", {})
      setemiting(false)
      setshow(false)
      console.log(allmembers)


    })
    socket.current.on("changeArray", ({ updated_Members, updated_pokemonData }) => {
      console.log("change array ")
      const allmembers = { members: updated_Members, pokemonData: updated_pokemonData }
      console.log("allmembers", allmembers)
      setAllmembers(allmembers)
      setemiting(true)



    })
    socket.current.on("TRshowSelect", ({ }) => {
      console.log("show start pannel")
      setShowgame(true)
    })

    console.log(allmembers)
    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [])

  function callbackFromMultiplayer() {
    setShowgame(false)
  }



  async function hadleRoomName(e) {
    e.preventDefault()
    setLoading(true)
    try {
      const name = roomName.trim()
      const trimedName = name.trim()
      const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/multiplayer/getuserdata`);
      const resJ = await res.json();
      const userData = resJ.data;
    

      socket.current.emit("joinRoom", { data: userData, roomName: trimedName, pokemonData: pokemons }, (callback) => {
        if (callback.res) { 
          setRoomName("")
          setshow(true)
      
        }
        else {
          callToast("No room found with given name")
          console.log("No room found with given name")
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
          showgame ? <Mulitplayer callback={callbackFromMultiplayer} /> :
           
            <MultiplayerTable useEffectFuntion={setup} admin={false} />
      }
      <div><ToastContainer /></div>
    </div>
  )
}

export default joinRoom