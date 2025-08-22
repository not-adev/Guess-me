"use client"
import React, { useState, useEffect } from 'react'
import Select from './Select'
import MultiplayerGame from './MultiplayerGame'
import { useSocketContext } from '../multiplayer/context/SocketContext'

const Mulitplayer = ({ callback }) => {
  const socket = useSocketContext()
  const [pokemonTransfer, setpokemonTransfer] = useState([])
  const [showSelect, setShowSelect] = useState(false)
  const [loading, setLoading] = useState(true)
  const [myselection, setMyselection] = useState([])
  const [myid, setMyid] = useState("")
  const [admin, setAdmin] = useState(false)
  useEffect(() => {
    socket.current.emit("giveId", {}, (callback) => {
      setMyid(callback._id)
      setShowSelect(true)
      console.log(callback._id)
      socket.current.emit("isAdmin", {}, (callback) => {
        setAdmin(callback.admin)
      })
      setLoading(false)
      console.log(admin , "admin")
    })


  }, [])

  // structure of pokemon tranfer
  // [
  //   {
  //     _id: dfhkdsfkadf-- > id of user snaching pokemon 
  //         snaching: [
  //                      {
  //                       _id: dfonvoeu-- > Id from which we are snaching 
  //                       coustomeId: 67 -- > id of pokemon
  //                      },
  //                      {
  //                       _id: dfonvoeu-- > Id from which we are snaching 
  //                       coustomeId: 61 -- > id of pokemon
  //                      }
  //                   ]

  //   },
  // 
  //   {
  //     _id: dfhkdsfkadf-- > id of user snaching pokemon 
  //         snaching: [
  //                      {
  //                       _id: dfonvoeu-- > Id from which we are snaching 
  //                       coustomeId: 67 -- > id of pokemon
  //                      },
  //                      {
  //                       _id: dfonvoeu-- > Id from which we are snaching 
  //                       coustomeId: 61 -- > id of pokemon
  //                      }
  //                   ]

  //   }
  // ]
  function callbackFromSelect(pokemonTra, myselection) {
    console.log("callback form select")
    setpokemonTransfer(pokemonTra)
    setMyselection(myselection)
    setShowSelect(false)

  }

  function callbackFromGame() {
    callback("show room interface")
  }


  return (
    <div>
      {
        loading ? <div>loading ....</div> :

          showSelect ?

            <Select callback={callbackFromSelect} id={myid} /> :
            <MultiplayerGame myselection={myselection} admin={admin} callback={callbackFromGame} pokemonTransfer={pokemonTransfer} />

      }


    </div>
  )
}

export default Mulitplayer