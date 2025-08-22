import connect_to_db from "@/db-connection/db-connection";
import { User } from "@/datamodel/user_model";
import { Pokemon } from "@/datamodel/pokemon_model";
import { NextResponse } from "next/server";
import { get_id } from "@/helper/get_Id";
await connect_to_db()
export async function GET(request) {
    try {
        const token = request.cookies.get('token')?.value || ''  
        const _id = get_id(token)
        const {pokemon} = await User.findById(_id,{pokemon : 1 , _id : 0 })
        
        if(pokemon.length <= 0){
            console.log("length is zero")
            return NextResponse.json({data : []},{status : 200})
        }
        let data = await Promise.all( pokemon.map(async (item) => {
            const obj = await Pokemon.findOne({ coustome_id: item }).select("-_id")
            console.log(obj)
            return obj
           
        })  )

        return NextResponse.json({
            data: data,
            message: " success "
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({
            message : error.message,
            
        },{status : 500})
    }



}