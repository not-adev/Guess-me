"use client"
import React, { useState, useRef } from 'react'
import { usePokemonContext } from '../context/PokemonContext'
import { useRouter } from 'next/navigation'


const Map = () => {

    const [numberReq, setNumberReq] = useState(0)
    const [visible, setVisible] = useState(false)
    const { pokemons } = usePokemonContext()
    const router = useRouter()
    const [locked, setLocked] = useState(false)
    const buttonContent = useRef([])

    const [modeImage, setModeImage] = useState("region-maps/1-btn.jpg")
    const [mapcontent, setMapcontent] = useState("The Kanto region is the first region introduced in the Pokémon world. It's based on the real-world Kantō region of Japan and is the setting for the original Pokémon games. Kanto is known for its diverse locations like cities, towns, forests, mountains, and seas, and is also the location where players can encounter the original 151 Pokémon")
    const changeImg = (index, req) => {
        const length = pokemons.length

        const url = ` http://res.cloudinary.com/dcgquf0d0/image/upload/v1750943829/pokemons/map-images/${index + 1}-btn.jpg`
        setModeImage(url)
        const content = buttonContent.current[index].innerText
        setMapcontent(content)
        setNumberReq(req)
        if (length >= req) {
            setLocked(false)
          
        }
        else {
            setLocked(true)
            
        }
        console.log("number requird is ", numberReq)



    }
    function region() {
        const length = pokemons.length

        if (length >= numberReq) {

            router.push(`${process.env.NEXT_PUBLIC_DOMAIN}/game`)
        }
        else {
            setVisible(true)
            setTimeout(() => {
                setVisible(false)
            }, 2000);
        }

    }
    return (
        <div className='map  h-auto md:w-[80%] w-[100%] m-auto md:flex items-start '>
            
        <div className={`top-[50%] absolute left-[50%] transform translate-x-[-50%] z-20  border text-4xl p-8 bg-[rgba(0,0,0,0.6)] transition-all  ${visible ? "opacity-100" : "opacity-0"} `}> You have not unlcoked this reagion yet collect {numberReq} pokemons to unlcoked </div> 
                    
            
            <div className='flex flex-col h-[514px] m-auto md:m-0 w-[80%] md:w-[30%] bg-[#292e38] overflow-auto'>
                <button onClick={() => changeImg(0, 0)} className='flex gap-3 hover:cursor-pointer items-center w-full  p-2'>
                    <div className='h-[70px] w-[90px] '>
                        <img src=" http://res.cloudinary.com/dcgquf0d0/image/upload/v1750943829/pokemons/map-images/1-btn.jpg" alt="img" className='h-full w-full rounded-lg' />
                    </div>

                    <div className='text-left font-bold text-xl text-nowrap overflow-hidden  w-[180px]' >
                        Kanto :- &nbsp;
                        <div ref={(el) => (buttonContent.current[0] = el)} className='text-gray-400 text-sm '>
                            The Kanto region is the first region introduced in the Pokémon world. It's based on the real-world Kantō region of Japan and is the setting for the original Pokémon games. Kanto is known for its diverse locations like cities, towns, forests, mountains, and seas, and is also the location where players can encounter the original 151 Pokémon
                        </div>
                    </div>

                </button>
                <button onClick={() => changeImg(1, 45)} className=' hover:cursor-pointer flex gap-3 items-center p-2 '>
                    <div className="h-[70px] w-[90px]">
                        <img src=" http://res.cloudinary.com/dcgquf0d0/image/upload/v1750943829/pokemons/map-images/2-btn.jpg" alt="img" className=' rounded-lg h-full w-full ' />
                    </div>

                    <div className='text-left font-bold text-xl text-nowrap overflow-hidden  w-[180px]' >
                        Jhoto :- &nbsp;
                        <div ref={(el) => (buttonContent.current[1] = el)} className='text-gray-400 text-sm '>
                            The Johto region, featured in Pokémon Gold, Silver, Crystal, HeartGold, and SoulSilver, is located west of Kanto and is inspired by the Kansai region of Japan. It introduced 100 new Pokémon, bringing the total to 251, and is known for its cultural richness and connection to Japanese architecture and traditions. The region also introduced features like berry planting and a new female protagonist option in the remakes
                        </div>
                    </div>
                </button>
                <button onClick={() => changeImg(2, 75)} className=' hover:cursor-pointer flex gap-3 items-center p-2 '>
                    <div className="h-[70px] w-[90px]">
                        <img src=" http://res.cloudinary.com/dcgquf0d0/image/upload/v1750943829/pokemons/map-images/3-btn.jpg" alt="img" className='h-full w-full rounded-lg ' />
                    </div>

                    <div className='text-left font-bold text-xl text-nowrap overflow-hidden  w-[180px]' >
                        Hoenn :- &nbsp;
                        <div ref={(el) => (buttonContent.current[2] = el)} className='text-gray-400 text-sm s'>
                            The Hoenn region is a location within the Pokémon world, introduced in the third generation of games (Pokémon Ruby, Sapphire, and Emerald) and their remakes (Omega Ruby and Alpha Sapphire). It is based on the real-world Japanese island of Kyushu and is known for its abundance of water and diverse environments
                        </div>
                    </div>
                </button>

                <button onClick={() => changeImg(3, 115)} className=' hover:cursor-pointer flex gap-3 items-center p-2 '>
                    <div className="h-[70px] w-[90px]">
                        <img src=" http://res.cloudinary.com/dcgquf0d0/image/upload/v1750943829/pokemons/map-images/4-btn.jpg" alt="img" className='h-full w-full rounded-lg ' />
                    </div>

                    <div className='text-left font-bold text-xl text-nowrap overflow-hidden  w-[180px]' >
                        Sinnoh :- &nbsp;
                        <div ref={(el) => (buttonContent.current[3] = el)} className='text-gray-400 text-sm s'>
                            The Sinnoh region is a location in the Pokémon world, featured in Pokémon Diamond, Pearl, Platinum, Brilliant Diamond, Shining Pearl, and Legends: Arceus. It is based on the Japanese island of Hokkaido and includes a large mainland, a northeastern Battle Zone, and several smaller islands.
                        </div>
                    </div>
                </button>
                <button onClick={() => changeImg(4, 147)} className=' hover:cursor-pointer flex gap-3 items-center p-2 '>
                    <div className="h-[70px] w-[90px]">
                        <img src=" http://res.cloudinary.com/dcgquf0d0/image/upload/v1750943829/pokemons/map-images/5-btn.jpg" alt="img" className='h-full w-full rounded-lg ' />
                    </div>

                    <div className='text-left font-bold text-xl text-nowrap overflow-hidden  w-[180px]' >
                        Unova :- &nbsp;
                        <div ref={(el) => (buttonContent.current[4] = el)} className='text-gray-400 text-sm s'>
                            The Unova region is a location in the Pokémon world, featured in Pokémon Black and White and their sequels, Black 2 and White 2. It is notable for being the first region in the main series games not based on a Japanese location, drawing inspiration from the New York City metropolitan area
                        </div>
                    </div>
                </button>
                <button onClick={() => changeImg(5, 193)} className=' hover:cursor-pointer flex gap-3 items-center p-2 '>
                    <div className="h-[70px] w-[90px]">
                        <img src=" http://res.cloudinary.com/dcgquf0d0/image/upload/v1750943829/pokemons/map-images/6-btn.jpg" alt="img" className='h-full w-full rounded-lg ' />
                    </div>

                    <div ref={(el) => (buttonContent.current[5] = el)} className='text-left font-bold text-xl text-nowrap overflow-hidden  w-[180px]' >
                        Kalos :- &nbsp;
                        <div className='text-gray-400 text-sm s'>
                            The Kalos region is a region in the Pokémon world, featured in Pokémon X and Y and Pokémon Legends: Z-A. It is shaped like a five-pointed star and inspired by Metropolitan France and Europe. Many locations in Kalos are based on real-world French landmarks, such as Prism Tower Eiffel Tower and the Lumiose Art Museum the Louvre
                        </div>
                    </div>
                </button>
                <button onClick={() => changeImg(6, 214)} className=' hover:cursor-pointer flex gap-3 items-center p-2 '>
                    <div className="h-[70px] w-[90px]">
                        <img src=" http://res.cloudinary.com/dcgquf0d0/image/upload/v1750943829/pokemons/map-images/7-btn.jpg" alt="img" className='h-full w-full rounded-lg ' />
                    </div>

                    <div ref={(el) => (buttonContent.current[6] = el)} className='text-left font-bold text-xl text-nowrap overflow-hidden  w-[180px]' >
                        Alola :- &nbsp;
                        <div className='text-gray-400 text-sm s'>
                            The Alola region is a tropical archipelago inspired by the Hawaiian islands, serving as the setting for Pokémon Sun, Moon, Ultra Sun, and Ultra Moon. It features four main islands: Melemele, Akala, Ula'ula, and Poni, plus the artificial island, Aether Paradise.
                        </div>
                    </div>
                </button>
                <button onClick={() => changeImg(7, 240)} className='flex  hover:cursor-pointer gap-3 items-center p-2 '>
                    <div className="h-[70px] w-[90px]">
                        <img src=" http://res.cloudinary.com/dcgquf0d0/image/upload/v1750943829/pokemons/map-images/8-btn.jpg" alt="img" className='h-full w-full rounded-lg ' />
                    </div>

                    <div ref={(el) => (buttonContent.current[7] = el)} className='text-left font-bold text-xl text-nowrap overflow-hidden  w-[180px]' >
                        Galar :- &nbsp;
                        <div className='text-gray-400 text-sm s'>
                            The Galar region, featured in Pokémon Sword and Shield, is inspired by the United Kingdom. It's known for its unique Pokémon, including starter Pokémon Grookey, Scorbunny, and Sobble, and legendary Pokémon Zacian and Zamazenta.
                        </div>
                    </div>
                </button>
                <button onClick={() => changeImg(8, 312)} className='flex  hover:cursor-pointer gap-3 items-center p-2 '>
                    <div className="h-[70px] w-[90px]">
                        <img src=" http://res.cloudinary.com/dcgquf0d0/image/upload/v1750943829/pokemons/map-images/9-btn.jpg" alt="img" className='h-full w-full rounded-lg ' />
                    </div>

                    <div className='text-left font-bold text-xl text-nowrap overflow-hidden  w-[180px]' >
                        Paldea :- &nbsp;
                        <div ref={(el) => (buttonContent.current[8] = el)} className='text-gray-400 text-sm s'>
                            The Paldea region is the setting for the Pokémon Scarlet and Violet games, inspired by the Iberian Peninsula (primarily Spain and Portugal). It features diverse landscapes, including lakes, wastelands, and mountain ranges, with a large crater called the Great Crater of Paldea at its center.
                        </div>
                    </div>
                </button>
            </div>
            <div className=' bg-[#292e38] w-[80%]  md:w-[70%] m-auto     ' >

                <div className='relative'>
                    <img src={modeImage} alt="img" className='w-full h-[400px]' />
                    <div className={locked ? "block" : "hidden"}>
                        <div className='absolute top-[50%] z-11 left-[50%] transform translate-x-[50%] translate-y-[50%]'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-lock"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 2a5 5 0 0 1 5 5v3a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-10a3 3 0 0 1 -3 -3v-6a3 3 0 0 1 3 -3v-3a5 5 0 0 1 5 -5m0 12a2 2 0 0 0 -1.995 1.85l-.005 .15a2 2 0 1 0 2 -2m0 -10a3 3 0 0 0 -3 3v3h6v-3a3 3 0 0 0 -3 -3" /></svg>
                        </div>
                        <div className='h-[400px]  absolute top-0 left-0 opacity-50 bg-black w-full'></div>
                    </div>
                    <button onClick={() => region(numberReq)} className='border absolute  bg-red-800 text-2xl p-2  shadow-[0px_2px_20px_2px_black] top-3 right-8 rounded-lg'>Play</button>
                </div>
                <div className='p-2'>
                    {mapcontent}
                </div>
            </div>
        </div>
    )
}

export default Map