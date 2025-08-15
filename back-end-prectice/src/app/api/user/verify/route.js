import { User } from "@/datamodel/user_model";
import connect_to_db from "@/db-connection/db-connection";
import { NextResponse } from "next/server";

connect_to_db()
export async function POST(request) {
    const reqbody = await request.json();
    const { token } = reqbody;


    console.log('email veerification ')
    console.log('token ' + token)
    const userExist = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } })
    if (!userExist) return NextResponse.json({
        message: 'invalid token',
        code: 0
    })
    userExist.isVerified = true
    userExist.verifyToken = undefined
    userExist.verifyTokenExpiry = undefined;
    await userExist.save();
    return NextResponse.json({ code: 1 })

    // else {
    //     const userExist = await User.findOne({ forgotPasswordToken: token, forgotPasswordExpiry: { $gt: Date.now() } })
    //     if (!userExist) return NextResponse.json({
    //         message: 'invalid token',
    //     },{status:400})

    //     userExist.forgotPasswordToken = undefined
    //     userExist.forgotPasswordExpiry = undefined;
    //     await userExist.save();

    // }





}