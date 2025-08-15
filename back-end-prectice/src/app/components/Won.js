import React from 'react'
import Cardcomponent from './Cardcomponent'

const Won = ({arrayOfData}) => {

    return (
        <div className='perspective-[1000px] relative'>
            <div className='text-white font-bold text-center pt-7 pb-2 text-4xl'>
                You won
            </div>
            {
                arrayOfData.map((item)=>{
                    return (

                        <Cardcomponent data={item}  />
                    )
                })
            }
        </div>
    )
}

export default Won