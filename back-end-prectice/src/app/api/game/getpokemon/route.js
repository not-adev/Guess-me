import connect_to_db from "@/db-connection/db-connection";
import { Pokemon } from "@/datamodel/pokemon_model";
import { NextResponse } from "next/server";

export async function GET() {
        await connect_to_db()
        let data = [];
        let mySet = new Set()
        let randomArray = []
        const count = await Pokemon.countDocuments()
        while (true) {
                const random = Math.floor(Math.random() * count) + 1
                mySet.add(random)
                if (mySet.size >= 4) {
                        randomArray = Array.from(mySet);
                        break
                }
        }
        
        for (let index = 0; index < 4; index++) {

                const random = randomArray[index]
                const res = await Pokemon.findOne({ coustome_id: random }).select('-_id');
             
                data.push(res)

        }
       
        return NextResponse.json(data)




}