//send otp
const otpgenerator=require('otp-generator');
const OTP = require('../models/OTP');
const User=require('../models/User');
const Profile = require('../models/Profile');
const mailsender = require('../utils/mailsender');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

exports.sendotp=async(req,res)=>{
try {
    const {email}=req.body;
    const isExist=await User.findOne({email});

    if(isExist){
        return res.status(401).json({
            message:"User already registered!"
        })
    }
    //TODO:Must unique
    const otp=otpgenerator.generate(6, 
        { upperCaseAlphabets: false, lowerCaseAlphabets: false,specialChars:false });

    const response=await OTP.create({email,otp});

    console.log(response)
    return res.status(200).json({
        success:true,
        message:"Otp sent successfully",
        otp
    })

    

} catch (error) {
    console.log(error)
    return res.status(404).json({
        success:false,
        message:"failed to send otp"
    })
}
}

//sign up
exports.signup=async(req,res)=>{
    try {
        const {firstName,lastName,email,password,confirmPassword,accountType,otp}=req.body;

        if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
            return res.status(401).json({
                message:"All fields are required!!"
            })
        }
        if(password!==confirmPassword){
            return res.status(403).json({
                message:"Password is incorrect"
            })
        }
        let recentOtp=await OTP.find({email}).sort({createdAt:-1}).limit(1)
        recentOtp=recentOtp[0].otp
        console.log(recentOtp,otp,typeof(otp))
        if(recentOtp!==otp){
            return res.status(403).json({
                success:false,
                message:"You have Entered Wrong Otp."
            })
        }
        const hashpwd=await bcrypt.hash(password,10);
        const profileDetails=await Profile.create({
            gender:null,dataOfbirth:null,contactNumber:null,about:null
        })
        const user=await User.create( 
            {firstName,
            lastName,
            email,
            password:hashpwd,
            accountType,
            additionalDetails:profileDetails._id,
            imageUrl:`https://api.dicebear.com/9.x/initials/svg?seed=${firstName} ${lastName}`
        })
        console.log(user)
        return res.status(200).json({
            message:"user registered successfully",
            user
        })

        
    } catch (error) {
        console.log(error)
    return res.status(404).json({
        success:false,
        message:"failed to Register"
    })
    }
}



//sign in
exports.signin=async(req,res)=>{
    try {
        const {email,password}=req.body;
        if(!email || !password){
            return res.status(403).json({
                message:"All Fieds are required!"
            })
        }
        const isExist=await User.findOne({email});
        if(!isExist){
            
            return res.status(404).json({
                success:false,
                message:"Please Register first!"
            })
        }
        const verifypassword=await bcrypt.compare(password,isExist.password);
        if(!verifypassword){
        return res.status(404).json({
                success:false,
                message:"Password is incorrect"
            })
        }
        const payload={
            id:isExist._id,
            accountType:isExist.accountType,
            email:isExist.email
        
        }
        const token=jwt.sign(payload,process.env.JWT_SECRET);
        const options={
            expiresIn:new Date(Date.now() + 3*24*60*60*1000)
        }
        return res.status(200).cookie("token",token,options).json({
            success:true,
            message:"Logged in Successfully",
            token,
            isExist
        })
        
    } catch (error) {
         console.log(error)
    return res.status(404).json({
        success:false,
        message:"failed to log in"
    })
    }
}





//change password
exports.changepassword=async(req,res)=>{
    try {
        const {oldpassword,newpassword,confirmnewpassword}=req.body;
        // const {id}=req.body.id
        const email=req.user.email
        if(!oldpassword || !newpassword || !confirmnewpassword){
            return res.status(402).json({
                message:"All fields are required"
            })
        }
        const user=await User.findOne({email:email})

        if(!bcrypt.compare(oldpassword,user.password)){
            return res.status(403).json({
                message:"old password is incorrect"
            })
        }
        let hashpwd=await bcrypt.hash(newpassword,10);
        const updatePasswordUser=await User.findOneAndUpdate({email:email},{
            password:hashpwd
        });
        const info=await mailsender(user.email,"Password is updated","Your password has been updated successfully.")

        return res.status(200).json({
            message:"password is updated successfully."
        })


      
    } catch (error) {
        console.log(error)
        return res.status(404).json({
                success:false,
                message:"error while updating password"
            })
    }
}