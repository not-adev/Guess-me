import { NextResponse } from "next/server";
import fs from 'fs';
import img_uplodad from "@/helper/cloud_upload";
import connect_to_db from "@/db-connection/db-connection";
import save_pokemon from "@/helper/save_pokemon";
await connect_to_db()
export async function GET() {
    try {
        console.log('api for sending img is hit ')
        const imgs = fs.opendirSync('C://Users//Nice//Desktop//next js//back-end-prectice//public//pokemon images')
        let dirent;
        let number = 1;
        while ((dirent = imgs.readSync()) !== null) {
            console.log('loop started ')
            const file = dirent.parentPath + '/' + dirent.name 
            
            // console.log(' pokemon not exist in database  ')
            const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${number}/`)
            const jdata = await data.json()
            const url = await img_uplodad(file, jdata.name)
            const perameter = {
                img: url,
                type: jdata.types[0].type.name,
                name: jdata.name,
                region: 'kanto',
                coustome_id: number
            }

            console.log('all configaration is done for saving pokemon ')
            await save_pokemon(perameter)
            number++





        }

        console.log(' loop stoped ')

        imgs.closeSync()
        return NextResponse.json({
            message: 'api running completed '
        })


    }
    catch (error) {
        console.log(error)
        return NextResponse.json({

            error
        })
    }

}


