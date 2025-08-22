"use client"
import React, { useEffect } from 'react'

const page = () => {
    useEffect(() => {
        fetch(
            `${process.env.NEXT_PUBLIC_DOMAIN}/api/multiplayer/addPokemon`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    pokemonArrray: [{pokemonId : 52}]
                })


            }
        )
            .then((res) => res.json())
            .then(data => console.log(data.message))


    }, [])

    return (
        <div>hihooh </div>
    )
}

export default page