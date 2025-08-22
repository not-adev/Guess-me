"use client"
import React, { useEffect, useRef, useState } from 'react'
import Cardcomponent from './Cardcomponent'
import { ToastContainer, toast } from 'react-toastify'
import { useGroupMemberContext } from '../multiplayer/context/GroupMemberContext'
import { useSocketContext } from '../multiplayer/context/SocketContext'

const Select = ({ callback, id }) => {
  const { allmembers, setAllmembers } = useGroupMemberContext()
  const socket = useSocketContext()
  // const id = useRef("")
  // const [userId, setuserId] = useState("")


  { /*
    strucute of allmembers  = 
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
  const [pokemonTransfer, setpokemonTransfer] = useState([])

  //     structure of pokemon tranfer
  // [
  //   {
  //     _id: dfhkdsfkadf-- > id of user snaching pokemon 
  //         snaching: [
  //                      {
  //                       _id: dfonvoeu-- > Id from which we are snaching 
  //                       pokemonId: 67 -- > id of pokemon
  //                      },
  //                      {
  //                       _id: dfonvoeu-- > Id from which we are snaching 
  //                       pokemonId: 61 -- > id of pokemon
  //                      }
  //                   ]

  //   },
  // 
  //   {
  //     _id: dfhkdsfkadf-- > id of user snaching pokemon 
  //         snaching: [
  //                      {
  //                       _id: dfonvoeu-- > Id from which we are snaching 
  //                       pokemonId: 67 -- > id of pokemon
  //                      },
  //                      {
  //                       _id: dfonvoeu-- > Id from which we are snaching 
  //                       pokemonId: 61 -- > id of pokemon
  //                      }
  //                   ]

  //   }
  // ]



  const CallToast = (e) => toast.error(e)
  // const [numberOfSelectionDone, setNumberOfSelectionDone] = useState(0)
  const numberOfSelectionDone = useRef(0)

  const [cuurentUserNumber, setCuurentUserNumber] = useState(0)
  {/* 
    current user hold the index on which we are mapping for pokemon 
    --> allmember.pokemon[0] then we will updat once selection is complete for fist user 
    --> allmember.pokemon[1] and so on ....
  
  
  */}
  const [selectedPokemons, setSelectedPokemons] = useState([])
  {/*
    structure of selectedPokemn 
      [
        {
        _id : adfdsjf  --> id from which we are snaching the pokemon
        pokemonId : 67 --> pokemon Id 
        } ,
        {
        _id : keruecnb  --> id from which we are snaching the pokemon
        pokemonId : 61 --> pokemon Id 
        } ,

      ]

  */}
  const [currentSelection, setCurrentSelection] = useState(null)





  useEffect(() => {
    
    const handleDoneSelection = ({ id, selectedPokemons }) => {
      numberOfSelectionDone.current += 1
      const object = { _id: id, snaching: selectedPokemons }
      let newArray = pokemonTransfer
      newArray.push(object)
      setpokemonTransfer(newArray)
      allSelectioinDone()
    }

    socket.current.on("TRdoneSelection", handleDoneSelection)
    DontSHowIfyourCards()

    return () => {
     socket.current.off("TRdoneSelection", handleDoneSelection)
    }

  }, [])

  function selectionDoneFromOurSide(number) {
    const DoneSelection = number + 1 > allmembers.members.length ? true : false
    if (DoneSelection) {
      socket.current.emit("giveId", {}, (callback) => {
        const obj = { _id: callback._id, snaching: selectedPokemons }
        let newArray = pokemonTransfer
        newArray.push(obj)
        setpokemonTransfer(newArray)
      })
      socket.current.emit("doneSelection", { selectedPokemons })
      numberOfSelectionDone.current += 1
      setCuurentUserNumber(number)
      allSelectioinDone()
      return true
    }
    return false
  }

  function DontSHowIfyourCards(number = 0) {
    if (number + 1 > allmembers.members.length) {
      console.log("index our of bound")
      return
    }
    if (allmembers.members[number]._id == id) {
      console.log("moving to next one ")
      number += 1
      if (selectionDoneFromOurSide(number)) {
        return true
      }

      setCuurentUserNumber(number)


    }
    console.log(number)

  }







  function Next() {
    console.log("next running")
    if (currentSelection == null) {
      CallToast("Plesase select a pokemon")
      return
    }
    const arrray = selectedPokemons

    arrray.push(currentSelection)
    setSelectedPokemons(arrray)
    const increasedUserNumber = cuurentUserNumber + 1

    if (selectionDoneFromOurSide(increasedUserNumber)) {
      return
    }

    if (DontSHowIfyourCards(increasedUserNumber)) {
      return
    }
    setCuurentUserNumber(increasedUserNumber)
    setCurrentSelection(null)
    // DontSHowIfyourCards(increasedUserNumber)
    console.log("current user number", increasedUserNumber)


  }


  function allSelectioinDone() {
    if (numberOfSelectionDone.current >= allmembers.members.length) {
      callback(pokemonTransfer, selectedPokemons)
    }

  }
  function handlechange(e) {
    const _id = allmembers.members[cuurentUserNumber]._id
    const pokemonId = parseInt(e.target.value)
    const obj = { _id, pokemonId }
    setCurrentSelection(obj)
  }

  return (
    <div className='  h-screen w-screen overflow-auto '>
      <div className='absolute top-0 left-0 -z-2 h-screen w-screen'> <img src="https://i.pinimg.com/1200x/d3/7e/3e/d37e3ebd66d484d4af0c6e5750548248.jpg" className='h-full w-full object-center object-cover blur-[6px]' alt="img" /></div>
      {
        allmembers.members.length <= cuurentUserNumber ?
          (<div className='text-2xl text-white text-center h-screen w-screen flex flex-col items-center justify-center'>
            <span>

              Selection complete waiting for other to complete
            </span>
          </div>) :


          <div className='flex flex-col'>

            <button className='text-white place-self-center border text-2xl px-2 py-1 my-3 font-bold' onClick={() => Next()}>Next</button>
            <div className='grid lg:grid-cols-4  md:grid-cols-3 sm:grid-cols-2  gap-7'>

              {allmembers.pokemonData[cuurentUserNumber].map((item) => {

                return (
                  <div key={item.coustome_id} className='flex flex-col items-center gap-y-3 preserve-3d perspective-1000  justify-center'>
                    <Cardcomponent data={item} />

                    <input className='m-auto h-[30px] w-[30px] b ' type="radio" name='card' value={item.coustome_id} onChange={(e) => handlechange(e)} />

                  </div>
                )
              })
              }
            </div>

          </div>
      }


      <div>
        <ToastContainer />
      </div>
    </div>
  )
}

export default Select