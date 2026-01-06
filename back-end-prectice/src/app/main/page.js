"use client"
import React, { useRef, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Map from '../components/Map'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { usePokemonContext } from '../context/PokemonContext'
import Image from 'next/image'
import ImageTag from '../components/ImageTag'


const Main = () => {
    const router = useRouter()
    const [required, setRequired] = useState(0)
    const sliderItem = useRef(null)
    const { pokemons, setPokemons } = usePokemonContext()
    const index = useRef(0);

    useEffect(() => {
        let slidemove = setInterval(() => {
            showSlide(index.current + 1)

        }, 3000);

        async function fetchPekemons() {
            try {
                const res = await fetch(`/api/game/displaypokemon`)
                const { data } = await res.json()
                setPokemons(data)
                console.log(data)
            } catch (error) {
                // alert("some error ocuured while showing collecting your data")
                console.log(error.message)
              
            }
        }

        fetchPekemons()

        return () => {
            clearInterval(slidemove)
        }




    }, [])


    function showSlide(i) {

        index.current = (i + 5) % 5;
        let percentage = 100 / 5


        sliderItem.current.style.transform = `translateX(-${index.current * percentage}%)`;

    }

    return (
        <div className='bg-[#181c23] m-0 p-0 box-border text-white relative'>
            <ImageTag width={1} height={1} src="/main-bg.png" alt="img" className='w-[100%] object-fill absolute  top-0 left-0' />

            <Navbar />


            <div className='slider sm:w-[90%] md:w-[70%] mb-15 mt-6 overflow-hidden h-auto m-auto'>
                <div ref={sliderItem} className='slider-item  w-[500%] transition-transform duration-1000  flex'>
                    <div className='w-[20%]'>
                        <div className='md:h-[350px] bg-yellow md:flex bg-re-600  relative w-[100%] m-auto  '>


                            <ImageTag   src="http://res.cloudinary.com/dcgquf0d0/image/upload/v1750943383/pokemons/slider-images/img1.jpg" alt="img" className='md:rounded-lg md:rounded-r-none rounded-t-lg w-full  md:w-[70%]  md:h-auto h-[400px] ' />
                            <div className=' bg-[rgba(0,0,0,.8)] w-full md:w-[30%] text-center p-2 md:rounded-lg md:rounded-l-none rounded-b-lg md:h-full '>
                                <div> info </div>
                                <div>
                                    features
                                </div>
                                <div>
                                    backchodi
                                </div>
                            </div>





                        </div>
                    </div>
                    <div className='w-[20%] '>
                        <div className='md:h-[350px] bg-yellow md:flex relative w-[100%] m-auto  '>


                            <ImageTag width={1} height={1}  src="http://res.cloudinary.com/dcgquf0d0/image/upload/v1750943383/pokemons/slider-images/img2.jpg" alt="img" className='md:rounded-lg md:rounded-r-none rounded-t-lg w-full md:w-[70%]  md:h-auto h-[400px]  ' />
                            <div className='absol bg-[rgba(0,0,0,.8)] md:w-[30%] text-center p-2 md:rounded-lg md:rounded-l-none rounded-b-lg w-full md:h-full '>
                                <div> info </div>
                                <div>
                                    features
                                </div>
                                <div>
                                    backchodi
                                </div>
                            </div>


                        </div>
                    </div>
                    <div className='w-[20%] '>
                        <div className='md:h-[350px] md:flex relative w-[100%] m-auto  '>


                            <ImageTag width={1} height={1}  src="http://res.cloudinary.com/dcgquf0d0/image/upload/v1750943383/pokemons/slider-images/img3.jpg" alt="img" className='md:rounded-lg md:rounded-r-none rounded-t-lg  md:w-[70%] w-full md:h-auto h-[400px]  ' />
                            <div className=' bg-[rgba(0,0,0,.8)] md:w-[30%] w-full text-center p-2 md:rounded-lg md:rounded-l-none rounded-b-lg md:h-full '>
                                <div> info </div>
                                <div>
                                    features
                                </div>
                                <div>
                                    backchodi
                                </div>
                            </div>


                        </div>
                    </div>
                    <div className='w-[20%] '>
                        <div className='md:h-[350px] md:flex relative w-[100%] m-auto  '>


                            <ImageTag width={1} height={1}  src="http://res.cloudinary.com/dcgquf0d0/image/upload/v1750943383/pokemons/slider-images/img4.jpg" alt="img" className='md:rounded-lg md:rounded-r-none rounded-t-lg  md:w-[70%] w-full md:h-auto h-[400px]  ' />
                            <div className=' bg-[rgba(0,0,0,.8)] md:w-[30%] w-full text-center p-2 md:rounded-lg md:rounded-l-none rounded-b-lg md:h-full '>
                                <div> info </div>
                                <div>
                                    features
                                </div>
                                <div>
                                    backchodi
                                </div>
                            </div>


                        </div>
                    </div>
                    <div className='w-[20%] '>
                        <div className='md:h-[350px] md:flex relative w-[100%] m-auto  '>


                            <ImageTag width={1} height={1}  src="http://res.cloudinary.com/dcgquf0d0/image/upload/v1750943383/pokemons/slider-images/img5.jpg" alt="img" className='md:rounded-lg md:rounded-r-none rounded-t-lg  md:w-[70%] w-full md:h-auto h-[400px]   ' />
                            <div className=' bg-[rgba(0,0,0,.8)] md:w-[30%] w-full text-center p-2 md:rounded-lg md:rounded-l-none rounded-b-lg md:h-full '>
                                <div> info </div>
                                <div>
                                    features
                                </div>
                                <div>
                                    backchodi
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
            <div className='modes header mt-7 hr flex items-center g-amber-50  gap-2 bg-a'>
                <div className='w-[20%] bg-red-500 h-[8px]'>

                </div>
                <div className='pb-2 text-5xl font-bold'>
                    Modes
                </div>
                <div className='w-[70%] bg-red-500 h-[8px]'>

                </div>
            </div>

            <div className='flex flex-col md:flex-row  w-full items-center justify-center text-3xl gap-10 pt-9 '>
                <a href='#map' className=' bg-[#292e38] cursor-pointer bg-cover h-[150px] w-[290px] md:w-a  lg:w-[290px] justify-center gap-2 flex items-center  px-3'>
                    <img  className='invert-100' src="https://img.icons8.com/ios/50/battle.png" alt="battle" />
                    <div className=' font-bold '>
                        Hunt
                    </div>
                </a>
                <div  className=' bg-[#292e38]  rel bg-cover h-[150px] relative w-[290px] md:w-auto lg:w-[290px] justify-center  flex items-center gap-2 px-3'>
                    <div className=' h-full w-full bg-black/10 absolute inset-0 z-40'></div>
                    <div className='absolute top-[50%] left-[50%] transform z-20 translate-x-[-50%] invert-0 translate-y-[-50%]'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="currentColor" className="icon icon-tabler icons-tabler-filled icon-tabler-lock"><path stroke="none" d="M0 0h24v24H0z" fill="black" /><path d="M12 2a5 5 0 0 1 5 5v3a3 3 0 0 1 3 3v6a3 3 0 0 1 -3 3h-10a3 3 0 0 1 -3 -3v-6a3 3 0 0 1 3 -3v-3a5 5 0 0 1 5 -5m0 12a2 2 0 0 0 -1.995 1.85l-.005 .15a2 2 0 1 0 2 -2m0 -10a3 3 0 0 0 -3 3v3h6v-3a3 3 0 0 0 -3 -3" /></svg>
                        </div>
                    <img   className='invert-100' src="https://img.icons8.com/ios-glyphs/30/fire-element--v1.png" alt="fire-element--v1" />
                    <div className=' font-bold relative '>
                         
                        Rapid Fire
                    </div>
                </div>
                <div className=' bg-[#292e38] bg-cover h-[150px] w-[290px] md:w-auto lg:w-[290px] justify-center  flex items-center gap-2 px-3'>
                    <img   className='invert-100 ' src="https://img.icons8.com/external-outline-andi-nur-abdillah/64/external-Multiplayer-gaming-(outline)-outline-andi-nur-abdillah.png" alt="external-Multiplayer-gaming-(outline)-outline-andi-nur-abdillah" />
                    <div className=' font-bold '>
                        <Link href="/multiplayer"> Multiplayer</Link>
                    </div>
                </div>

            </div>
            <div className='mt-7 hr flex items-center g-amber-50 mb-6 gap-2 bg-a'>
                <div className='w-[20%] bg-red-500 h-[8px]'>

                </div>
                <div className='map-header pb-2 text-5xl font-bold'>
                    Regions
                </div>
                <div className='w-[70%] bg-red-500 h-[8px]'>
                </div>
            </div>
            <Map />

            <div className='footer mt-20 pt-4 bg-black shadow-[0px_-7px_20px_9px_black] '>
                <div className='px-7 font-bold text-3xl'>

                    Site Links
                </div>
                <div className='flex px-4 justify-center gap-3 md:gap-38 text-xl '>
                    <ul>
                        <li>Contact us</li>
                        <li>About Us</li>
                        <li>Directions</li>
                        <li>Blogs</li>
                    </ul>
                    <ul>
                        <li>Promotions</li>
                        <li>Partners</li>
                        <li>Careers</li>
                        <li>FAQs</li>
                    </ul>
                    <ul>
                        <li >About the Developer</li>
                        <li>Media</li>
                        <li>Resposive Gaming</li>
                        <li>Pokemon wallpapers</li>
                    </ul>

                </div>
                <div className='h-[150px] bg-red-800  mt-17 flex items-center justify-around'>
                    <div className='md:text-6xl text-3xl  sm:text-5xl font-bold md:pb-5'>
                        Guess me !
                    </div>
                    <div>
                        <button className='border rounded-lg sm:py-4 px-2 py-2 sm:px-4 font-semibold shadow-[0px_2px_20px_2px_black] sm:text-xl md:text-4xl'>Lets Play </button>
                    </div>
                </div>
            </div>

        </div>

    )
}

export default Main