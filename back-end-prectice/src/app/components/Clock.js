"use client"
import React,{useState,useEffect} from 'react'

const Clock = ({callback}) => {
    const [clock, setClock] = useState(11)


    useEffect(() => {

        console.log("rerender")
        const clockInerval = setInterval(() => {

            setClock(value => {
                if (value <= 0) {
                    callback(true)
                    console.log("clock turend 0 ")
                    clearInterval(clockInerval)
                    return 0
                }
                return value - 1
            })

        }, 1000);

        return () => {
            clearInterval(clockInerval)
        }
    }, [])

    return (

        <div className='absolute top-0 text-2xl p-1 border left-2'>
            <div>
                00:{clock}
            </div>
        </div>
    )

}

export default Clock