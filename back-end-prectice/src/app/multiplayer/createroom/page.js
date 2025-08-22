"use client"
import React, { useContext, useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'
import { useSocketContext } from '../context/SocketContext'
import { useGroupMemberContext } from '../context/GroupMemberContext'
import Mulitplayer from '@/app/components/Mulitplayer'
import { ToastContainer, toast } from 'react-toastify'
import MultiplayerTable from '@/app/components/MultiplayerTable'

import { usePokemonContext } from '@/app/context/PokemonContext'
const createRoom = () => {
  let S_no = 0
  const { pokemons, setPokemons } = usePokemonContext()
  const [showgame, setShowgame] = useState(false)
  const [groupName, setGroupName] = useState([])
  const callToast = (e) => toast.error(e); 
  // const [loading, setloading] = useState(true)
  const { allmembers, setAllmembers } = useGroupMemberContext()

  const socket = useSocketContext()





  async function setup() {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/multiplayer/getuserdata`);
      const resJ = await res.json();
      const userData = resJ.data;
      console.log(userData)
      setGroupName(userData._id)
      const ft = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/game/displaypokemon`)
      const { data } = await ft.json()
      console.log(data)
      setPokemons(data)

      socket.current.emit("createRoom", { data: userData, pokemonData: data }, (callback) => {
        // if(!callback.members){
        //   return
        // }
        // const allmembers = { members: callback.members, pokemonData: callback.pokemonData }
        // console.log("allmemberss", allmembers)
        // setAllmembers(allmembers)
      })

    } catch (error) {
      console.error("Error during setup:", error.message);
    }

  }


  useEffect(() => {

    socket.current = io(`${process.env.NEXT_PUBLIC_SOCKETCONNECTION}`);
    // async function setup() {
    //   try {
    //     const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/multiplayer/getuserdata`);
    //     const resJ = await res.json();
    //     const userData = resJ.data;
    //     setGroupName(userData._id)
    //     const ft = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/game/displaypokemon`)
    //     const { data } = await ft.json()
    //     console.log(data)
    //     setPokemons(data)

    //     socket.current.emit("createRoom", { data: userData, pokemonData: data }, (callback) => {
    //       const allmembers = { members: callback.members, pokemonData: callback.pokemonData }
    //       console.log("allmemberss", allmembers)
    //       setAllmembers(allmembers)
    //     })

    //   } catch (error) {
    //     console.error("Error during setup:", error.message);
    //   }
    //   finally {
    //     setloading(false)
    //   }
    // }

    // setup();


    socket.current.on("changeArray", ({ updated_Members, updated_pokemonData }) => {
      console.log("change array ")
      const allmember = { members: updated_Members, pokemonData: updated_pokemonData }
      setAllmembers(allmember)
      console.log(allmember)

    })
    socket.current.on("TRshowSelect", ({ }) => {
      setShowgame(true)
    })

    return () => {
      if (socket.current) {

        socket.current.disconnect();
      }
    };
  }, []);
  function callbackFromMultiplayer() {
    setShowgame(false)
  }
  function Play() {
    if (allmembers.members.length < 2) {
      callToast("Room must have more then one player")
      console.log("Room must have more then one player")
      return
    }
    socket.current.emit("showSelect", {})
  }


  return (
    <>{
      showgame ? <Mulitplayer callback={callbackFromMultiplayer} /> :
        <MultiplayerTable Play={Play} useEffectFuntion={setup} admin={true} groupName={groupName} />
    }
      <div><ToastContainer /></div>
    </>

  )
}

export default createRoom