import mongoose from "mongoose";

let userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'userName is not given but required'],
        unique: true
    },
    email: {
        type: String,
        required: [true, 'email is not given but required'],
        unique: true
    },
    pokemon : {
        type : [Number]
    },
    password: {
        type: String,
        required: [true, 'password is not given but required'],
    },
    isVerified :{type: Boolean,default : false},
    forgotPasswordToken: {type: String},
    forgotPasswordExpiry :{type : Date } ,
    verifyToken : {type : String } ,
    verifyTokenExpiry :{type :Date}  

})

export const User = mongoose.models.user || mongoose.model('user',userSchema) ;
