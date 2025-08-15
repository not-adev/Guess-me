"use client"
import React, { useEffect, useRef, useState } from 'react'
import Cardcomponent from './Cardcomponent'
import { usePokemonContext } from '../context/PokemonContext'

const Galary = () => {
    const { pokemons, setPokemons } = usePokemonContext()
    const [loading, setLoading] = useState(false)
    const [Type, setType] = useState(null)

    useEffect(() => {
        console.log(pokemons)


    }, [])


    const buttonref = useRef([])
    function filter(type, index) {
        console.log("jo")

        for (let i = 0; i < buttonref.current.length; i++) {
            const element = buttonref.current[i];
            if (i != index) {
                element.style.backgroundColor = ""
                element.style.color = "white"
            }
            else {
                element.style.backgroundColor = "white"
                element.style.color = "black"

            }



        }
        console.log(type)
        setType(type)

    }


    return (
        <div className='p-3 max-h-screen relative overflow-auto'>
            <div className='text-3xl font-bold text-center mb-7 pl-3'>
                Collection
            </div>
           

            <div className='flex gap-2 md:text-xl sm:text-lg items-center justify-center pt-6 pb-11 flex-wrap'>
                <div onClick={() => filter(false, 0)} ref={(e) => buttonref.current[0] = e} className='border px-2 cursor-pointer'>All</div>
                <div onClick={() => filter("normal", 1)} ref={(e) => buttonref.current[1] = e} className='border px-2  cursor-pointer'>Normal</div>
                <div onClick={() => filter("grass", 2)} ref={(e) => buttonref.current[2] = e} className='border px-2  cursor-pointer'>Grass</div>
                <div onClick={() => filter("water", 3)} ref={(e) => buttonref.current[3] = e} className='border px-2  cursor-pointer'>Water</div>
                <div onClick={() => filter("fire", 4)} ref={(e) => buttonref.current[4] = e} className='border px-2 cursor-pointer'>Fire</div>
                <div onClick={() => filter("rock", 5)} ref={(e) => buttonref.current[5] = e} className='border px-2 cursor-pointer'>Rock</div>
                <div onClick={() => filter("electric", 6)} ref={(e) => buttonref.current[6] = e} className='border px-2 cursor-pointer'>Electric</div>
                <div onClick={() => filter("ghost", 7)} ref={(e) => buttonref.current[7] = e} className='border px-2 cursor-pointer'>Ghost</div>
                <div onClick={() => filter("poison", 8)} ref={(e) => buttonref.current[8] = e} className='border px-2 cursor-pointer'>Poison</div>
                <div onClick={() => filter("fairy", 9)} ref={(e) => buttonref.current[9] = e} className='border px-2 cursor-pointer'>Fairy</div>
                <div onClick={() => filter("dragon", 10)} ref={(e) => buttonref.current[10] = e} className='border px-2  cursor-pointer'>Dragon</div>
                <div onClick={() => filter("bug", 11)} ref={(e) => buttonref.current[11] = e} className='border px-2 cursor-pointer'>Bug</div>
                <div onClick={() => filter("flying", 12)} ref={(e) => buttonref.current[12] = e} className='border px-2 cursor-pointer'>Flying</div>
            </div>

            <div className='grid lg:grid-cols-4  md:grid-cols-3 sm:grid-cols-2  gap-7'>

                {
                    pokemons.length <= 0 ?
                        <div className="text-center">

                            No pokemon catched yet
                        </div> :



                        pokemons
                            .filter((item) => !Type || item.type === Type)
                            .map((item) => (
                                <div key={item.coustome_id} className="preserve-3d flex flex-col items-center perspective-1000">
                                    <Cardcomponent data={item} />
                                </div>
                            ))


                }
            </div>

        </div>
    )
}

export default Galary