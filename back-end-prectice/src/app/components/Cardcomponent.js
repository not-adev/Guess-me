"use client "

import React, { useEffect, useState } from 'react'
import { useRef } from 'react'





const Cardcomponent = ({ data }) => {
  const [bg_color, setBg_color] = useState("#6a686b")
  const [cardbg, setCardbg] = useState('https://res.cloudinary.com/dcgquf0d0/image/upload/v1752500412/electric-bg_lfs4gh.jpg')
  useEffect(() => {
    if (data.type == "flying") {
      setCardbg("https://res.cloudinary.com/dcgquf0d0/image/upload/v1752500412/flying-bg_t7zg5c.jpg")
      setBg_color()
    }
    else if (data.type == "fire") {
      setCardbg("https://res.cloudinary.com/dcgquf0d0/image/upload/v1752500411/fire-bg_anbqsq.jpg")
      setBg_color("#fca503")
    }
    else if (data.type == "water") {
      setCardbg("https://res.cloudinary.com/dcgquf0d0/image/upload/v1752500417/water-bg_cpjprw.jpg")
      setBg_color("#11d6f5")
    }
    else if (data.type == "ice") {
      setCardbg("https://res.cloudinary.com/dcgquf0d0/image/upload/v1752500412/ice-bg_gobxfa.jpg")
      setBg_color("#ffffff")

    }
    else if (data.type == "normal") {
      setCardbg("https://res.cloudinary.com/dcgquf0d0/image/upload/v1752500411/fighting-bg_jenm8t.jpg")
      setBg_color("#fcfcfc")
    }
    else if (data.type == "grass") {
      setCardbg("https://res.cloudinary.com/dcgquf0d0/image/upload/v1752500412/grass-bg_sxriok.jpg")
      setBg_color("#4c956c")

    }
    else if (data.type == "fighting") {
      setCardbg("https://res.cloudinary.com/dcgquf0d0/image/upload/v1752500413/normal-bg_ectxbw.jpg")
      setBg_color("#a88a85")


    }
    else if (data.type == "electric") {
      setCardbg("https://res.cloudinary.com/dcgquf0d0/image/upload/v1752500412/electric-bg_lfs4gh.jpg")
    

    }
    else if (data.type == "poison") {
      setCardbg("https://res.cloudinary.com/dcgquf0d0/image/upload/v1752500414/poision-bg_grq2zp.jpg")
      setBg_color("#a418f5")

    }
    else if (data.type == "fairy") {
      setCardbg("https://res.cloudinary.com/dcgquf0d0/image/upload/v1752500412/failry-bg_rjuaul.jpg")
      setBg_color("#a418f5")

    }
    else if (data.type == "psychic") {
      setCardbg("https://res.cloudinary.com/dcgquf0d0/image/upload/v1752500414/psycic-bg_l17h30.jpg")
      setBg_color("#3b3435")

    }
    else if (data.type == "steal") {
      setCardbg("https://res.cloudinary.com/dcgquf0d0/image/upload/v1752500416/steal-bg_o0amf8.jpg")
      setBg_color("#a39d9e")

    }
    else if (data.type == "rock") {
      setCardbg("https://res.cloudinary.com/dcgquf0d0/image/upload/v1752500415/rock-bg_fbyjom.jpg")
      setBg_color("#C4A484")

    }
    else if (data.type == "ghost") {
      setCardbg("https://res.cloudinary.com/dcgquf0d0/image/upload/v1752500415/rock-bg_fbyjom.jpg")
      setBg_color("#3d246e")

    }




  }, [])

  const card = useRef(null)
  const glowRef = useRef(null)
  function third_dimesion(e) {

    let x = e.clientX
    let y = e.clientY
    let { left, top, width, height, bottom } = card.current.getBoundingClientRect()

    const centerX = left + width / 2;
    const centerY = top + height / 2;


    const xproportion = (centerY - e.clientY) / (height / 2);
    const yproportion = (e.clientX - centerX) / (width / 2);

    const xrotate = xproportion * 30;
    const yrotate = yproportion * 30;


    card.current.style.transform = ` rotateX(${xrotate}deg) rotateY(${yrotate}deg) `
    glowRef.current.style.background = `radial-gradient(circle at ${yproportion * 150}% ${-xproportion  * 150}%, 
      rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0))`;
  }
  function leave() {
    card.current.style.transform = `rotateX(0deg)`
    card.current.style.transform = `rotateY(0deg)`

    glowRef.current.style.background = 'none';
  }

  return (
    <>
      <div className={` group relative perspective-[1000px] rounded-lg text-white w-[220px] h-auto  p-3   `} style={{ backgroundColor: bg_color }} onMouseMove={third_dimesion} onMouseLeave={leave} ref={card} >
        <div className={`group h-auto  transition-transform duration-100 rounded-2xl w-auto bg-no-repeat bg-cover  `} style={{ backgroundImage: `url(${cardbg})` }} >
          <div ref={glowRef} className="absolute top-0 left-0 rounded-2xl w-[100%] h-[100%] pointer-events-none transition-all duration- ease-out">

          </div>
          <div className='flex '>
            <div className='flex gap-x-5 mx-3'>
              {/* <img src="/v5_31.png" alt="img" className='w-[47px] h-[55px] mt-4' /> */}
              <img src="/v3_19.png" alt="img" className='w-[168px] h-[62px] ' />
            </div>
          </div>
          <div className='flex justify-center transform scale-150 transition-transform duration-1000'>
            <img src={data.img} alt="img" className='h-[120px] preserve-3d' />
          </div>
          <div className='w-[90%] relative '>
            <img src="/v2_10.png" alt="img" />
            <div className='absolute top-1 left-7 flex gap-x-1 '>
              <img src="/v3_20.png" alt="" className='w-[21px] h-[21px]' />
              <img src="/v3_20.png" alt="" className='w-[21px] h-[21px]' />
              <img src="/v3_20.png" alt="" className='w-[21px] h-[21px]' />
              <img src="/v3_20.png" alt="" className='w-[21px] h-[21px]' />

            </div>
          </div>

          <div className='flex flex-col p-4 gap-4 font-bold'>
            <div>
              Name : -{data.name}
            </div>
            <div>
              type :- {data.type}
            </div>
            <div>
              region :- {data.region}
            </div>
          </div>
        </div>


      </div>
    </>

  )
}

export default Cardcomponent