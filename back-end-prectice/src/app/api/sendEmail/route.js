import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { User } from '@/datamodel/user_model';
import connect_to_db from '@/db-connection/db-connection';

await connect_to_db()
export async function POST(Requsst) {

    try {
        const reqbody = await Requsst.json()
        const { email, emailType } = reqbody
        const token = uuidv4();
        console.log(email)
        if (emailType == 'email') {

            await User.findOneAndUpdate({ email }, {
                $set: { verifyToken: token, verifyTokenExpiry: Date.now() + 3600000 }
            })
        }
        else {
            console.log('email type is password')
           const account =  await User.findOneAndUpdate({ email }, {
                $set: { forgotPasswordToken: token, forgotPasswordExpiry: Date.now() + 3600000 }
            },{ new: true })
            console.log(account)
        }

        // const transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         user: 'ansariarif123111@gmail.com',
        //         pass: `${process.env.APP_PASSWORD}`,
        //     },
        // });
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "41164c6c0059b5",
                pass: "66760fec0ce4f6"
            }
        });





        const mailOptions = {
            from: 'arif@gmail',
            to: email,
            subject: emailType == 'email' ? 'verify your Email' : "change your account password ",
            html: emailType == 'email' ? ` <p> click <a href='${process.env.DOMAIN}/verify?token=${token}&emailType=${emailType}'>here</a> `
                : `<p> copy this token and paste it in the token field in your current page:-  ${token} </p>.`,
        }
        console.log('mail option created')
        // send mail with defined transport object
        await transporter.sendMail(mailOptions, () => {
            console.log('email send')
        });

        return NextResponse.json({ message: "email send" }, { status: 200 })
    } catch (error) {
        return NextResponse.json({ message: error.message }, { status: 500 })
    }

}
