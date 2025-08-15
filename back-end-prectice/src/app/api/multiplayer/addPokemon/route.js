import connect_to_db from "@/db-connection/db-connection";
import { NextResponse } from "next/server";
import { User } from "@/datamodel/user_model";
import { get_id } from "@/helper/get_Id";

export async function POST(request) {
    try {
        await connect_to_db()
        const reqbody = await request.json()
        const { pokemonArrray } = reqbody
        const token = request.cookies.get('token')?.value || ''
        const _id = get_id(token)
        const exist = await User.findById(_id)
        if(!exist) {
            return NextResponse.json({ message: "user not find" }, { status: 400 })
        }
        for (let i = 0; i < pokemonArrray.length; index++) {
            const pokemonId = pokemonArrray[i].pokemonId
            if (!exist.pokemon.includes(pokemonId)) {
                exist.pokemon.push(pokemonId)
            }

        }
        await exist.save()
        return NextResponse.json({ message: "done addition" }, { status: 200 })

    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }
}