import mongoose from 'mongoose'
const userschema=new mongoose.Schema({
    firstName:{
        type:String,
        trim:true,
        required:true
    },
    lastName:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        // required:true
    },
    accountType:{
        type:String,
        enum:["Student","Instructor","Admin"],
        default:"Student",
        required:true
    },
    additionalDetails:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile"
    },
    courses:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    }],

    token:{
        type:String,
        trim:true
    },
    resetTokenExpires:{
        type:Date,
    },

    imageUrl:{
        type:String,
        required:true
    },

    courseProgress:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"CourseProgress"
    }]



})

const User=mongoose.model("User",userschema)
export default User