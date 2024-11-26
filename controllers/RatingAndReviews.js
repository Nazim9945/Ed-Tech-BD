const { default: mongoose } = require("mongoose");
const Course = require("../models/Course");
const RatingAndReview = require("../models/RatingAndReview");
// const User=require('../models/User')

exports.createRating=async(req,res)=>{
    try {
        const{courseId,rating,review}=req.body;
        const userId=req.user.id;

        const enrolledcourse=await Course.findById({_id:courseId});
        const newId=new mongoose.Types.ObjectId(userId)
        if(!enrolledcourse.studentEnrolled.includes(newId)){
            return res.status(400).json({
                message:"can not review the course"
            })
        }
     
       //already review check
        const isReviewed=await RatingAndReview.findOne({
            User:userId,
            course:courseId
        })
        if(isReviewed){
            return res.status(400).json({
                                message:"Already reviewed the course"
                            })
        }





        const newRatings=await RatingAndReview.create({rating,review,course:courseId,User:userId});
        
        await Course.findByIdAndUpdate({_id:courseId},{
            $push:{
                ratingsAndreviews:newRatings._id
            }
        })

        return res.json({
            message:"Reviewed successfully",
            newRatings
        })

        
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            message:"failed to create rating"
        })
    }
}


//getAvgRating

exports.getAvgRating=async(req,res)=>{
    try {
        const {courseId}=req.body;
        
        const result=await RatingAndReview.aggregate([
            {
                $match:{
                    course:new mongoose.Types.ObjectId(courseId)
                }
            },
            {
                $group:{
                    _id:null,
                    avgRating:{$avg:"$rating"}
                }
            }
        ])
        if(result.length>0){
            return res.status(200).json({
                message:"fetched avg rating",
                avgRating:result[0]
            })
        }
         return res.status(200).json({
                message:"fetched avg rating",
                avgRating:0
            })

        
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            message:"failed to fethed avg rating"
        })
    }
}

//getAllRating

exports.getAllRating=async(req,res)=>{
    try {
        const allAllRating=await RatingAndReview.find({}).populate({
            path:"User",
            select:"firstName lastName"
        }).populate({
            path:"course",
            select:"corseName"
        })
        return res.json({
            message:"fetched all ratings",
            allAllRating
        })

        
    } catch (error) {
         return res.status(400).json({
                message:"failed to fetched all ratings",
            })
    }
}