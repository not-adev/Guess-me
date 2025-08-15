'use client'
import Link from "next/link";
import { io } from "socket.io-client";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const videoref = useRef()
  const [visible, setvisble] = useState(true)
  const [contentvisible, setContentvisible] = useState(false)



  const enablePlayback = () => {
    setvisble(false)




    videoref.current.muted = false;
    videoref.current.play();
    if (!videoref.current.paused) {

      setTimeout(() => {
        console.log("ljll")
        videoref.current.style.zIndex = -1;
        videoref.current.style.opacity = 0;


        videoref.current.pause()
        setContentvisible(true)


      }, 18000);
    }

  };




  return (
    <>
      <div className="h-screen">
        <video ref={videoref} id="vid" className="h-[100%] transition-all duration-1000 z-3 absolute top-0 w-screen object-cover" src=" http://res.cloudinary.com/dcgquf0d0/video/upload/v1746020785/pokemons/pokeballbg.mp4.mp4" playsInline></video>
      </div>


      <div className={contentvisible ? " absolute top-0 left-0 bg-[url(/pokeball-bg.gif)] md:h-screen h-auto bg-no-repeat bg-cover bg-center  " : "hidden"}>
        <div className="flex  justify-end items-center gap-2 mt-4 mx-3" >
          <button className=" font-bold rounded-lg  bg-black hover:bg-white hover:text-black text-white  py-1 px-7 "><Link  href={`${process.env.NEXT_PUBLIC_DOMAIN}/user_login_sinup`}>SignUp</Link></button>
          <button className=" font-bold rounded-lg  bg-black hover:bg-white hover:text-black text-white  py-1 px-7 "><Link  href={`${process.env.NEXT_PUBLIC_DOMAIN}/user_login_sinup`}>Login</Link></button>
        </div>

        <div className="md:flex">
          <div className="right px-5 w-full flex flex-col items-start justify-center ">
            <div className="text-[black] text-8xl font-bold mt-10 mb-6  ">
              Welcome
            </div>
            <div className="flex flex-col items-center  ">
              <div className="  border  border-white rounded-2xl w-[70%]  px-10 py-4 backdrop-blur-xl">
                <h1 className="text-2xl mb-3 text-gray-200">About the website </h1>
                <div className="text-[black] ml-3 "> This website is a simulation game about pokemons and perfoms a simple game experince about
                  identifing pokemons which appear at random form the backend based on your map (region example : - kanto )
                </div>
              </div>

              <button className="bg-white text-black mix-blend-screen font-bold text-5xl  px-6 py-2 mt-10 rounded-lg cursor-pointer ">
                <Link href={`${process.env.NEXT_PUBLIC_DOMAIN}/user_login_sinup`}> Get Started</Link>
               
              </button>

            </div>
          </div>
          <div className=" left flex items-center justify-center px-5 w-full text-center ">
            <div className=" text-7xl my-30  font-bold text-white">Guess Me ! </div>
          </div>

        </div>

      </div>
      <div className={visible ? "absolute top-0 h-full z-10 text-white w-full bg-black flex items-center justify-center " : "hidden"}>
        <button onClick={enablePlayback} className="border px-2 py-1 rounded-lg border-purple-500 text-2xl hover:cursor-pointer">Enter</button>
      </div>
    </>

  );
}
