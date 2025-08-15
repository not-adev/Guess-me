import { User } from "@/datamodel/user_model";
import connect_to_db from "@/db-connection/db-connection";
import sendEmail from "@/helper/mailer";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

export async function POST(request) {
    await connect_to_db()
    try {
        const reqbody = await request.json();
        const { username, email, password } = reqbody;

        const existing_user = await User.findOne({ email })
        if (existing_user) {
            return NextResponse.json({ error: 'user alredy exists ',code : 2, status: 400 })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPasword = await bcrypt.hash(password, salt);
        const newuser = new User({
            userName: username,
            email: email,
            password: hashedPasword,
        })

        const savedUser = await newuser.save();
        await sendEmail({ email, emailType:'email'})
        return NextResponse.json({ status: 'success ' ,code : 2 })
    } catch (error) {
        return NextResponse.json({ error: 'catch error' }, {
            status: 500,
            statusText: 'api didt work '
        })
    }

}