import { NextResponse } from "next/server";
import { get_id } from "@/helper/get_Id";
import connect_to_db from "@/db-connection/db-connection";
import { User } from "@/datamodel/user_model";
await connect_to_db()

export async function GET(request) {
  try {
    const token = request.cookies.get('token')?.value || '' 
    const id = await get_id(token)
    
    const user = await User.findOne({ _id: id }).select('-password')
    console.log(user)
    if (!user) return NextResponse.json({ message: 'invalid token ' })
    return NextResponse.json({
      message: 'data send ',
      data: user
    })
    
    

  } catch (error) {
    console.log(error)

  }
}