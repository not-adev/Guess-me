import React, { useEffect, useMemo, useRef, useState } from 'react'
import { memo } from 'react';

const MultiplayerGame = ({ data, callback }) => {
    const [randomAr, setrandomAr] = useState([])
    const divRef = useRef([])

    useEffect(() => {
       
        const generateUniqueRandomNumbers = () => {
            const numbers = [0, 1, 2, 3];
            for (let i = numbers.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
            }

            setrandomAr(numbers);
        };
        generateUniqueRandomNumbers()

    }, [])

    function wonOrLose(value, index) {
        const time = Date.now()
        for (let i = 0; i < divRef.current.length; i++) {
            const element = divRef.current[i];
            if (i != index) {
                element.style.backgroundColor = ""
            }
            else {
                element.style.backgroundColor = "green"
            }

        }
        value == 0 ? callback(1, time) : callback(0, null)
    }



    return (
        <>
            {
                randomAr.map((value, index) => {
                    return (

                        <div key={value} ref={(el) => (divRef.current[index] = el)} className='w-full m-auto my-2 '>
                            <button onClick={() => wonOrLose(value, index)} className="border text-5xl p-2 w-full">
                                {
                                    data[value].name
                                }

                            </button>
                        </div>
                    )
                })
            }
        </>

    )
}

export default memo(MultiplayerGame)