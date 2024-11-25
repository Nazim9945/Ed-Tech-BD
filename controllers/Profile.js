//needs update->beacuse alredy added when user created

const Profile = require("../models/Profile")
const User = require("../models/User")

exports.updateProfile=async(req,res)=>{
    try {
        const {gender,dateOfbirth="",about="",contactNumber=""}=req.body
        const userId=req.user.id
        if(!userId || !gender){
            return res.status(400).json({
                message:"All fields are required"
            })
        }
        
        const user=await User.findOne({_id:userId});
        const profileId=user.additionalDetails;
        const profileDetails=await findByIdAndUpdate({_id:profileId},{gender,dateOfbirth,about ,contactNumber},{new:true});


        return res.status(200).json({
            message:"profile updated successfully"
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
        if(!userId || !courseId){
            return res.status(400).json({
                message:"fields are missing"
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
        await Course.findByIdAndUpdate({_id:courseId},{
            $pull:{
                studentEnrolled:userId
            }
        })
        

        //cron-job try implementing scheduling task or api

        await User.findByIdAndDelete({_id:userId})
        return res.json({
            message:"User account deleted successfully"
        })

    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message:"failed to delete user account"
        })
    }
}


//get user

exports.getAllUserDetails=async(rea,res)=>{
    try {
        const id=req.user.id;
        const alluser=await User.find({}).populate("additionalDetails").exec();
        return res.status(404).json({
            message:"fetched all user details successfully",
            alluser
        })
        
    } catch (error) {
         console.log(error);
        return res.status(404).json({
            message:"failed to fetch user details"
        })
    }
}
