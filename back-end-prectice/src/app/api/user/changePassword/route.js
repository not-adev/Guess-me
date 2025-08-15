import connect_to_db from "@/db-connection/db-connection";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { User } from "@/datamodel/user_model";


export async function POST(request) {
    try {
        await connect_to_db()
        const reqbody = await request.json();
        const { newPassword, token, email } = reqbody;
        const trimedToken = token.trim()
        console.log(trimedToken)
        const userExist = await User.findOne({ forgotPasswordToken: trimedToken, forgotPasswordExpiry: { $gt: Date.now() } })
        const userExists = await User.findOne({ email: email })
        console.log(userExists.email, userExists.forgotPasswordToken)

        if (!userExist) {
            console.log("user does not exist")
            return NextResponse.json({
                message: 'invalid token',
                code: 0
            }, { status: 400 })
        }

        userExist.forgotPasswordToken = undefined
        userExist.forgotPasswordExpiry = undefined;
        const salt = await bcrypt.genSalt(10);
        const hashedPasword = await bcrypt.hash(newPassword, salt);
        userExist.password = hashedPasword
        console.log("hi")
        await userExist.save();
        return NextResponse.json({ code: 1 })

    } catch (error) {
        return NextResponse.json({ code: 0 }, { status: 500 })

    }

}