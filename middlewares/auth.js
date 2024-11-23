//auth
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
require('dotenv').config()
exports.auth=async(req,res,next)=>{
    try {
        let {token}=req.headers('Authorization') || req.cookies.token;
        if(!token || !token.startsWith("Bearer")){
          
        return res.status(404).json({
                success:false,
                message:"token is missing"
            })
        }
        token=token.split("Bearer")[1];
        let decode=jwt.verify(token,process.env.JWT_SECRET);
        console.log(decode)
        if(!decode){
           
        return res.status(404).json({
                success:false,
                message:"error while decoding token"
            })
        }
        req.user=decode
        
        next()
        
    } catch (error) {
        console.log(error)
        return res.status(404).json({
                success:false,
                message:"error while authenticate"
            })
    }
}



//isStudent
exports.isStudent=async(req,res,next)=>{
    try {
        if(req.user.accountType!='Student'){
            return res.status(404).json({
                message:"This route is protected for Student"
            })
        }
        next();
        
    } catch (error) {
        console.log(error)
        return res.status(404).json({
                success:false,
                message:"error while verifying route"
            })
    }
}




//isAdmin

exports.isAdmin=async(req,res,next)=>{
    try {
        if(req.user.accountType!='Admin'){
            return res.status(404).json({
                message:"This route is protected for Admin"
            })
        }
        next();
        
    } catch (error) {
        console.log(error)
        return res.status(404).json({
                success:false,
                message:"error while verifying route"
            })
    }
}


//isInstructor
exports.isInstructor=async(req,res,next)=>{
    try {
        if(req.user.accountType!='Instrutor'){
            return res.status(404).json({
                message:"This route is protected for Instructor"
            })
        }
        next();
        
    } catch (error) {
        console.log(error)
        return res.status(404).json({
                success:false,
                message:"error while verifying route"
            })
    }
}