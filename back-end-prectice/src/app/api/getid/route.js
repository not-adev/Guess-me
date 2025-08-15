import { NextResponse } from "next/server";
import { get_id } from "@/helper/get_Id";

export async function GET(request) {

    try {
        console.log("hi form api ");

        const token = request.cookies.get('token')?.value || ''
        const _id = get_id(token)
     
        return NextResponse.json({ id: _id })
    } catch (error) {
        return NextResponse.json({ id: null }, { status: 400 })
    }
}