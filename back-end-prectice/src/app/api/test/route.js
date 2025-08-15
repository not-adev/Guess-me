
import { NextResponse } from "next/server";
export async function GET(request) {
   const data = await fetch('https://pokeapi.co/api/v2/pokemon/1/')
   const jdata = await data.json()


   const obj = {
      type: jdata.types[0].type.name,
      name: jdata.name
   }
   console.log(jdata.name)

   return NextResponse.json({
      message: 'api done running ',
      dataaa: obj

   })
}