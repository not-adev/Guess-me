import React from 'react'
import Cardcomponent from './Cardcomponent'

const Loose = ({arrayOfData = []}) => {
  return (
     <div className='perspective-[1000px] relative'>
            <div className='text-white font-bold text-center pt-7 pb-2 text-4xl'>
                You Loose
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

export default React.memo(Loose)