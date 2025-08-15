import { NextResponse } from "next/server";
import connect_to_db from "@/db-connection/db-connection";
import { Pokemon } from "@/datamodel/pokemon_model";
export async function POST(request) {
    await connect_to_db()
    const reqbody = await request.json()
    const { coustomeIds } = reqbody
    let data = await Promise.all(coustomeIds.map(async (item) => {
        const obj = await Pokemon.findOne({ coustome_id: item.pokemonId}).select("-_id")
        return obj

    }))

    return NextResponse.json({data : data} ,{status : 200})
}