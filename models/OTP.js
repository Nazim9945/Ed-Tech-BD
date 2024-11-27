const mongoose =require('mongoose')
const mailsender = require('../utils/mailsender')
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
    type:String,
    required:true,
    trim:true
   }


})
// mail sending funtionality here
//using pre-save middleware
async function sendingVerificationMail(email,otp){
    try {
        console.log(email,otp)
        const responseinfo=await mailsender(email,"Verification email from Studypath",otp);
        console.log("mail sent successfully",responseinfo)
        
    } catch (error) {
        console.log("issue while sending mail")
        console.log(error)
    }
}
OTPschema.pre('save',async function(next){
    await sendingVerificationMail(this.email,this.otp);
    next()
})


module.exports=mongoose.model("OTP",OTPschema)