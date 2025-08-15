"use client"
import React,{useState,useEffect} from 'react'

const Clock = ({callback}) => {
    const [clock, setClock] = useState(11)


    useEffect(() => {
        let value = 11
        console.log("rerender")
        const clockInerval = setInterval(() => {
            value -= 1 

            // setClock(value => {
            //     if (value < 0) {
            //         console.log("clock turend 0 ")
            //         clearInterval(clockInerval)
            //         callback(true)
            //         return value
            //     }
            //     return value - 1
            // })
            if(value < 0){
                callback(true)
            }
            else{
                setClock(value)
            }

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