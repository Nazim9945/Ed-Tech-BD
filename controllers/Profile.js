//needs update->beacuse alredy added when user created
const Course=require('../models/Course')
const Profile = require("../models/Profile")
const User = require("../models/User")
const {uploadFiles}=require('../utils/uploadFiles')
require('dotenv').config()
exports.updateProfile=async(req,res)=>{
    try {
        const {gender,dateOfbirth,about,contactNumber}=req.body

        const userId=req.user.id

        if(!gender){
            return res.status(400).json({
                message:"Please fill the gender field"
            })
        }
        
        const user=await User.findOne({_id:userId});
        const profileId=user.additionalDetails;
         const profile=await Profile.findById({_id:profileId});

        profile.dateOfbirth=dateOfbirth || profile.dateOfbirth;
        profile.contactNumber=contactNumber || profile.contactNumber;
        profile.about=about || profile.about;
        profile.gender=gender;
        
        

//needs changes here
        const profileDetails=await Profile.findByIdAndUpdate({_id:profileId},profile,{new:true});


        return res.status(200).json({
            message:"profile updated successfully",
            profileDetails
        })

        
        
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message:"failed to update the profile"
        })
    }
}


//deleteAccount

exports.deleteAccount=async(req,res)=>{
    try {
        const {courseId}=req.body;
        const userId=req.user.id;
         const role=req.user.accountType
         //what if user just came to plateform and want to dlt account then
        //  must user  have a course id necessaary->NO
        if(!userId || !courseId || !role){
            return res.status(400).json({
                message:"fields are missing"
            })
        }
       
        if(role==='Instructor'){
            return res.status(404).json({
                message:"At least one of the admin permission is require"
            })
        }
       const user=await User.findOne({_id:userId});
       if(!user){
        return res.status(404).json({
            message:"No user data found"
        })
       }
        const profileId=user.additionalDetails;
        await Profile.findByIdAndDelete({_id:profileId});
       if(role!=='Admin'){
         await Course.findByIdAndUpdate({_id:courseId},{
            $pull:{
                studentEnrolled:userId
            }
        })
       }
        

        //cron-job try implementing scheduling task or api

        await User.findByIdAndDelete({_id:userId})
        return res.json({
            message:"User account deleted successfully"
        })

    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message:`failed to delete ${role} account`
        })
    }
}


//get user

exports.getUserDetails=async(req,res)=>{ 
    try {
        const id=req.user.id;
        const userDetails=await User.findOne({_id:id}).populate("additionalDetails").exec();
        if(!userDetails){
            return res.status(400).json({
                message:"No User found"
            })
        }
        return res.status(200).json({
            message:"fetched all user details successfully",
            data:userDetails
        })
        
    } catch (error) {
         console.log(error);
        return res.status(404).json({
            message:"failed to fetch user details"
        })
    }
}


//update profile pic

exports.updateProfilePic=async(req,res)=>{
    try {
        const userId=req.user.id
        const file=req.files.profilePic
        if(!file){
            return res.status(404).json({
                message:"File is missing"
            })
        }

        const uploadOnCloudinary=await uploadFiles(file,process.env.FOLDER_NAME)
        console.log(uploadOnCloudinary)
        const user=await User.findByIdAndUpdate({_id:userId},{
            imageUrl:uploadOnCloudinary.secure_url
        },{new:true})

        return res.json({
            message:"profile pic updated",
            user
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message:"failed to update profile pic"
        })
    }
}