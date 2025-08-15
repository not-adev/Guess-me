"use client"
import React, { useState } from 'react'
// import sendEmail from '@/helper/mailer'
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Logintoast from '../components/Logintoast';
const page = () => {
    const router = useRouter()
    const callToast = (message)=> toast(message)
    const [isemail, setIsemail] = useState(false)
    const [data, setdata] = useState({
        newPassword: "",
        confirm: "",
        email: "",
        token: ""
    })
    const [status, setStatus] = useState('submit')

    const handlechange = (e) => {
        setdata((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }
    function checkEmail(email) {
        if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            return false
        }
        return true
    }
    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            setStatus("submiting...")
            if (checkEmail(data.email)) {
                if (data.newPassword !== data.confirm) {
                    setStatus('New passwords do not match ❌');
                    return;
                }
                const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/user/changePassword`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
              
                const { code } = await res.json()
                console.log(code)
                if (code == 1) {
                    // toast(<Logintoast img_url={"/login-failed-img.png"} message={"Password Changed successfuly "} />)
                   callToast("password changed succesfully")
                   
                    setTimeout(() => {
                        router.push('/user_login_sinup')
                    }, 1000);
                    return
                }
                // toast(<Logintoast img_url={"/login-failed-img.png"} message={"Invalid token"} />)
                // setdata({
                //     newPassword: "",
                //     confirm: "",
                //     email: "",
                //     token: ""
                // })



            }
        } catch (error) {
            toast(<Logintoast img_url={"/login-failed-img.png"} message={"some error ocuured try again"} />)

        }
        finally{
            setStatus("submit")
        }






    }

    const handleEmail = async () => {

        try {
            setStatus("submiting...")
            // await sendEmail({ email: data.email, emailType: "forgetpassword" })
            if(!checkEmail(data.email)){
                callToast("invalid email")
                return
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/sendEmail`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: data.email, emailType: "forgetpassword" })
            });
            console.log(res)
            if(!res.ok){
                callToast("email not send retry ")
                return
            }

            callToast("we have send you an email copy toke from their and paste in the toke field ")
            setIsemail(true)
            return
        } catch (error) {
            alert("some error ocuured try again")
        }
        finally {
            setStatus("submit")
        }

    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-4 text-center">Change Password</h2>

                <input
                    type="email"
                    placeholder="enter your registerd Eamil "
                    value={data.email}
                    name='email'
                    onChange={(e) => handlechange(e)}
                    className="w-full p-2 mb-3 border border-gray-300 rounded"
                    required
                />
                <button onClick={() => handleEmail()} className={!isemail ? "bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full" : "hidden"}>{status}</button>
                <input
                    type="password"
                    placeholder="New Password"
                    name="newPassword"
                    value={data.newPassword}
                    onChange={(e) => handlechange(e)}
                    className={isemail ? `w-full p-2 mb-3 border border-gray-300 rounded` : "hidden"}
                    required
                />

                <input
                    type="password"
                    placeholder="Confirm New Password"
                    value={data.confirm}
                    name="confirm"
                    onChange={(e) => handlechange(e)}
                    className={isemail ? "w-full p-2 mb-3 border border-gray-300 rounded" : "hidden"}
                    required
                />
                <input
                    type="text"
                    placeholder="Paste token here"
                    value={data.token}
                    name="token"
                    onChange={(e) => handlechange(e)}
                    className={isemail ? "w-full p-2 mb-3 border border-gray-300 rounded" : "hidden"}
                    required
                />

                <button
                    type="submit"
                    className={isemail ? "bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full" : "hidden"}
                >
                    {status}
                </button>




            </form>
            <div><ToastContainer /></div>
        </div>
    );

}

export default page