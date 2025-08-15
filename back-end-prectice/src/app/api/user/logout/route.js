import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = NextResponse.json({ message : 'log out succesfull'},{status:200})
        response.cookies.set('token','',{
            httpOnly: true ,
            maxAge : -1 ,
        })
        return response 
    } catch (error) {
        return NextResponse.json({error:'could not logout some error occured '})
    }
}