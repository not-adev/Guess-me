import { NextRequest, NextResponse } from "next/server";
import { User } from "@/datamodel/user_model";
import bcrypt from 'bcryptjs';
import connect_to_db from "@/db-connection/db-connection";
import jwt from 'jsonwebtoken';

connect_to_db()
export async function POST(request) {

    try {
        const reqbody = await request.json()
        const { email, password } = reqbody
        const userExist = await User.findOne({ email })
        if (!userExist) {
            return NextResponse.json({ message: 'user doesnt exists',code : 0 }, { status: 400 })
        }
        const compare = await bcrypt.compare(password, userExist.password);
        if (!compare) {
            console.log(compare)
            return NextResponse.json({ message: 'incorrect password or against email' }, { status: 400 })
        }
        const token = await jwt.sign({ id: userExist._id }, process.env.SECRET_KEY, { expiresIn: process.env.JWT_TOKEN_EXPIRY });
        const response = NextResponse.json({
           status: 'success ',
           code : 1
        }, {
            status: 200
        })
        response.cookies.set('token', token, {
            httpOnly: true,
            maxAge: 60 * 60 * 24
        })
        return response;
    } catch (error) {
        return NextResponse.json({error : error ,message : 'log in failed '})
        
    }
        
    

}