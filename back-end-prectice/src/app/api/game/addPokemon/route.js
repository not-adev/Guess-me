import connect_to_db from "@/db-connection/db-connection";
import { User } from "@/datamodel/user_model";
import { NextResponse } from "next/server";
import { get_id } from "@/helper/get_Id";
await connect_to_db()
export async function POST(request) {
    try {
        const token = request.cookies.get('token')?.value || ''
        const _id = get_id(token)
        const reqbody = await request.json()
        const { coustome_id } = reqbody;
        const user = await User.findById(_id)
        const exist = user.pokemon.includes(coustome_id)
        console.log(exist)
        if(exist){
            return NextResponse.json({
                message :"pokemon already exists"
            } , {status : 200})
        }
        const added = await User.findByIdAndUpdate(_id,{
            $push : {pokemon : coustome_id}
        })

        return NextResponse.json({
            message: 'pokemon added succefully '
        }, { status: 200 })


    } catch (error) {
        console.log(error.message)
        return NextResponse.json({
            error: error.message
        }, { status: 500 })

    }




}





