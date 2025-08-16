"use client"
import React, { useEffect, useRef } from 'react'
import Sinup_login_feild from '../components/Sinup_login_feild'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Logintoast from '../components/Logintoast'
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';

const singup_login = () => {
    const router = useRouter()
    const emailRef = useRef(null)
    const code = 2
    const [validation, setvalidation] = useState({
        username: false,
        email: false,
        password: false
    })

    const [islogin, setislogin] = useState(true)
    const [loading, setLoading] = useState(false)
    const [data, setdata] = useState(
        {
            "username": '',
            "email": '',
            "password": ''
        })



    function handlechange(e) {
        const name = e.target.name;
        const value = e.target.value;
        setdata((data) => ({ ...data, [name]: value }))


    }

    function validateForm({ username, email, password }) {


        // Username: At least 3 characters, letters/numbers only
        if (!islogin) {
            if (!username || username.trim().length < 3) {
                setvalidation(prev => ({ ...prev, username: true }))
                return false
            }
        }


        // Email: Basic pattern check

        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            setvalidation(prev => ({ ...prev, email: true }))
            return false
        }



        // Password: Min 8 characters, with letters & numbers
        if (!password || password.length < 8) {
            setvalidation(prev => ({ ...prev, password: true }))
            return false
        }
        setvalidation({
            username: false,
            email: false,
            password: false
        })
        return true


    }
    async function handlesubmit(e) {
        e.preventDefault();
        try {
            if (validateForm(data)) {
            setLoading(true)
            console.log("ji")
            let request = "signup";
            if (islogin) {
                request = "login"
            }
            const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/user/${request}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            const { code } = await res.json()
            if (code == 0) {
                toast(<Logintoast img_url={"/login-failed-img.png"} message={"User does not exist please Signup"} />)
                setislogin(false)
            }
            else if (code == 1) {
                toast(<Logintoast img_url={"/login-failed-img.png"} message={"Login succesfull"} />)
                setTimeout(() => {
                    router.push(`${process.env.NEXT_PUBLIC_DOMAIN}/main`)
                }, 1000);

            }
            else {
                  toast(<Logintoast img_url={"/login-failed-img.png"} message={"incorrect password"} />)
                setislogin(true)
            }
             console.log(data)
          


        }
        } catch (error) {
              toast(<Logintoast img_url={"/login-failed-img.png"} message={"some error ocuured try again latter "} />)
            
        }
        finally{
              setLoading(false)
           
            setdata({
                "username": '',
                "email": '',
                "password": ''
            })
        }
        


    }

    function Change(bollean) {
        setislogin(bollean)
        setdata({
            "username": '',
            "email": '',
            "password": ''
        })

    }



    return (

        <div className='h-screen w-screen m-0 px-2 box-border bg-[url(/wall2.gif)] bg-left  bg-no-repeat bg-cover '>


            <div className="wrapper  flex justify-center items-center min-h-screen bg-black/20 ">

                <div className="lgcover ">

                    <div className="login_box  rounded-3xl relative sm:w-[450px] w-[350px]  backdrop-blur-md border  border-white md:p-20 py-20 px-6 pb-16 text-white shadow-[0px_0px_10px_2px_rgba(0,0,0,0)]">
                        <div className='flex justify-around'>
                            <div className={`absolute top-[10px] bg-[#e7cfb9]left-[33%] -translate-x-1/2 flex items-center justify-center w-[140px] h-[70px] rounded-b-[20px]   ${islogin && "bg-[#e7cfb9] "}`}>
                                <span className="text-[30px]  text-black"><button onClick={() => Change(true)} className='cursor-pointer' >Login</button></span>
                            </div>
                            <div className={`signup_header absolute top-[10px] left-[70%] -translate-x-1/2 flex justify-center items-center  w-[140px] h-[70px]  rounded-b-3xl ${!islogin && "bg-[#e7cfb9] "}`}>
                                <span className="text-[30px] text-black" ><button onClick={() => Change(false)} className='cursor-pointer'>Signup</button></span>
                            </div>
                        </div>
                        <form onSubmit={handlesubmit} >
                            <div className={`transition-all w-full sm:w-auto duration-500 ease-in-out mt-2  ${!islogin ? "opacity-100 max-h-23" : "opacity-0 max-h-0 hidden "}`}>
                                <Sinup_login_feild type="text" feild_name="username" value={data.username} handlechange={handlechange} />
                            </div>
                            <div className={validation.username ? "bg-red-500 p-2" : "hidden opacity-0"}>
                                Username must be at least 3 characters long.
                            </div>

                            <div ref={emailRef} className="input_box relative flex flex-col mt-5 mb-2" >
                                <Sinup_login_feild type='email' feild_name='email' value={data.email} handlechange={handlechange} />
                            </div>
                            <div className={validation.email ? "bg-red-500 p-2" : "hidden"}>
                                Please enter a valid email address.
                            </div>

                            <div className="input_box relative flex flex-col">
                                <Sinup_login_feild type='password' feild_name="password" value={data.password} handlechange={handlechange} />
                            </div>
                            <div className={validation.password ? "bg-red-500 p-2" : "hidden"}>
                                Password must be at least 8 characters long.
                            </div>

                            <div className="remember-forgot mt-2 flex flex-col items-center gap-2 justify-between text-sm">

                                <button type='submit' className='w-full text-black hover:text-white p-2 text-center bg-[#e7cfb9] text-lg font-medium rounded-xl border-none cursor-pointer transition duration-300 mt-2.5 mb-2.5 hover:bg-[#edc197] '>
                                    {loading ? "wait..." : "submit"}
                                    </button>
                                <div className="register flex flex-col items-center">
                                    {/* <div> <button onClick={() => { setislogin(false) }} className='hover:text-blue-600'>Don't have an account? sinup</button>
                                    </div> */}

                                    {islogin &&

                                        <span> <button className='hover:text-blue-600 cursor-pointer'><Link href="/forgetpassword">Forget Password</Link></button>
                                        </span>
                                    }
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div><ToastContainer /></div>
        </div>

    )
}

export default singup_login