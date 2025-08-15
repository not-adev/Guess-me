"use client"
import React, { useRef, useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Map from '../components/Map'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { usePokemonContext } from '../context/PokemonContext'


const Main = () => {
    const router = useRouter()
    const [required, setRequired] = useState(0)
    const sliderItem = useRef(null)
    const {pokemons,setPokemons} = usePokemonContext()
    const index = useRef(0);
   
    useEffect(() => {
        let slidemove = setInterval(() => {
            showSlide(index.current + 1)

        }, 3000);

        async function fetchPekemons() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/game/displaypokemon`)
                const { data } = await res.json()
                setPokemons(data)
                console.log(data)
            } catch (error) {
                // alert("some error ocuured while showing collecting your data")
                console.log(error.message)
                // router.push(`${process.env.NEXT_PUBLIC_DOMAIN}/user_login_sinup`)
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
            <img src="main-bg.png" alt="img" className='w-[100%] object-fill absolute  top-0 left-0' />

            <Navbar />


            <div className='slider  w-[100%] sm:w-[90%] md:w-[70%] mb-5 mt-6 overflow-hidden  m-auto'>
                <div ref={sliderItem} className='slider-item  w-[500%] transition-transform duration-1000  flex'>
                    <div className='w-[20%]'>
                        <div className='h-[350px] bg-yellow flex relative w-[100%] m-auto  '>
                            <div className='absol bg-[rgba(0,0,0,.8)] w-[30%] text-center p-2 rounded-lg rounded-r-none h-full '>
                                <div> info </div>
                                <div>
                                    features
                                </div>
                                <div>
                                    backchodi
                                </div>
                            </div>


                            <img src="http://res.cloudinary.com/dcgquf0d0/image/upload/v1750943383/pokemons/slider-images/img1.jpg" alt="img" className='rounded-lg rounded-l-none w-[70%]  ' />


                        </div>
                    </div>
                    <div className='w-[20%] '>
                        <div className='h-[350px] bg-yellow flex relative w-[100%] m-auto  '>
                            <div className='absol bg-[rgba(0,0,0,.8)] w-[30%] text-center p-2 rounded-lg rounded-r-none h-full '>
                                <div> info </div>
                                <div>
                                    features
                                </div>
                                <div>
                                    backchodi
                                </div>
                            </div>


                            <img src="http://res.cloudinary.com/dcgquf0d0/image/upload/v1750943383/pokemons/slider-images/img2.jpg" alt="img" className='rounded-lg rounded-l-none w-[70%]  ' />


                        </div>
                    </div>
                    <div className='w-[20%] '>
                        <div className='h-[350px] bg-yellow flex relative w-[100%] m-auto  '>
                            <div className='absol bg-[rgba(0,0,0,.8)] w-[30%] text-center p-2 rounded-lg rounded-r-none h-full '>
                                <div> info </div>
                                <div>
                                    features
                                </div>
                                <div>
                                    backchodi
                                </div>
                            </div>


                            <img src="http://res.cloudinary.com/dcgquf0d0/image/upload/v1750943383/pokemons/slider-images/img3.jpg" alt="img" className='rounded-lg rounded-l-none w-[70%]  ' />


                        </div>
                    </div>
                    <div className='w-[20%] '>
                        <div className='h-[350px] bg-yellow flex relative w-[100%] m-auto  '>
                            <div className='absol bg-[rgba(0,0,0,.8)] w-[30%] text-center p-2 rounded-lg rounded-r-none h-full '>
                                <div> info </div>
                                <div>
                                    features
                                </div>
                                <div>
                                    backchodi
                                </div>
                            </div>


                            <img src="http://res.cloudinary.com/dcgquf0d0/image/upload/v1750943383/pokemons/slider-images/img4.jpg" alt="img" className='rounded-lg rounded-l-none w-[70%]  ' />


                        </div>
                    </div>
                    <div className='w-[20%] '>
                        <div className='h-[350px] bg-yellow flex relative w-[100%] m-auto  '>
                            <div className='absol bg-[rgba(0,0,0,.8)] w-[30%] text-center p-2 rounded-lg rounded-r-none h-full '>
                                <div> info </div>
                                <div>
                                    features
                                </div>
                                <div>
                                    backchodi
                                </div>
                            </div>


                            <img src="http://res.cloudinary.com/dcgquf0d0/image/upload/v1750943383/pokemons/slider-images/img5.jpg" alt="img" className='rounded-lg rounded-l-none w-[70%]  ' />


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
                <div className=' bg-[#292e38] bg-cover h-[150px] w-[290px] md:w-a  lg:w-[290px] justify-center gap-2 flex items-center  px-3'>
                    <img className='invert-100' src="https://img.icons8.com/ios/50/battle.png" alt="battle" />
                    <div className=' font-bold '>
                        Hunt
                    </div>
                </div>
                <div className=' bg-[#292e38] bg-cover h-[150px] w-[290px] md:w-auto lg:w-[290px] justify-center  flex items-center gap-2 px-3'>
                    <img className='invert-100' src="https://img.icons8.com/ios-glyphs/30/fire-element--v1.png" alt="fire-element--v1" />
                    <div className=' font-bold '>
                        Rapid Fire
                    </div>
                </div>
                <div className=' bg-[#292e38] bg-cover h-[150px] w-[290px] md:w-auto lg:w-[290px] justify-center  flex items-center gap-2 px-3'>
                    <img className='invert-100 ' src="https://img.icons8.com/external-outline-andi-nur-abdillah/64/external-Multiplayer-gaming-(outline)-outline-andi-nur-abdillah.png" alt="external-Multiplayer-gaming-(outline)-outline-andi-nur-abdillah" />
                    <div className=' font-bold '>
                      <Link href = "/multiplayer"> Multiplayer</Link> 
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
            <Map/>
           
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