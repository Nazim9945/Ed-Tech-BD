const mongoose =require('mongoose')
const OTPschema=new mongoose.Schema({
   email:{
    type:String,
    trim:true
   },
   createdAt:{
    type:Date,
    default:Date.now(),
    expires:5*60
   },
   otp:{
    type:Number,
    required:true,
    trim:true
   }


})
// mail sending funtionality here
//using pre-save middleware




module.exports=mongoose.model("OTP",OTPschema)