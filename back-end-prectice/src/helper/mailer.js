import nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
import { User } from '@/datamodel/user_model';
import connect_to_db from '@/db-connection/db-connection';
console.log('email runnig ')
const token = uuidv4() ;

export default async function sendEmail({ email, emailType ,user}) {
    await connect_to_db()
     if (emailType == 'email'){
      
       await User.findOneAndUpdate({email},{
            $set:{verifyToken : token , verifyTokenExpiry : Date.now() + 3600000}
        })
     }
     else {
      console.log('email type is password')
       await User.findOneAndUpdate({email},{
            $set :{forgotPasswordToken : token ,forgotPasswordExpiry : Date.now() + 3600000}
        })
     }
    
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ansariarif123111@gmail.com',
            pass: `${process.env.APP_PASSWORD}`,
        },
    });

    // const transporter = nodemailer.createTransport({
    //   host: "sandbox.smtp.mailtrap.io",
    //   port: 2525,
    //   auth: {
    //     user: "41164c6c0059b5",
    //     pass: "66760fec0ce4f6"
    //   }
    // });
    

    const mailOptions = {
        from: 'arif@gmail',
        to: email,
        subject: emailType == 'email' ? 'verify your Eamil' : "change your account password ",
        html:emailType == 'email' ? ` <p> click <a href='${process.env.DOMAIN}/verify?token=${token}&emailType=${emailType}'>here</a> ` 
        : `<p> copy this toke and paste it in the token field in your current page:-  ${token} </p>.`, 
    }
    console.log('mail option created')
    // send mail with defined transport object
     await transporter.sendMail(mailOptions,()=>{
        console.log('email send')
    });
}
