"use client"
import React,{useState , useEffect} from 'react'
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
const Verify = () => {
    const router = useRouter()
    const [status, setStatus] = useState("verfying...")
    const queryParams = useSearchParams()
    const token = queryParams.get('token');
    const emailType = queryParams.get('emailType')
    useEffect(() => {
        fetch(`/api/user/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: token ,emailType : emailType})
        })
            .then(res => res.json())
            .then((data) => {
                if (data.code === 1) {
                    setStatus("Done")
                    setTimeout(() => {
                        router.push("/user_login_sinup")
                    }, 1000);

                }
                else {
                    setStatus(data.message) || setStatus("Invalid Token")
                }

            })



    }, [])

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="p-6 shadow-lg rounded bg-white text-center">
                <h2 className="text-2xl font-bold mb-4">Verify Email</h2>
                <p>{status}</p>
            </div>
        </div>
    );

}

export default Verify