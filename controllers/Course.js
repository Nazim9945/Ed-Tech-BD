const Category=require('../models/Category')
const Course=require('../models/Course')
const {uploadFiles}=require('../utils/uploadFiles')
const User=require('../models/User')
require('dotenv').config()
exports.createCourse=async(req,res)=>{
    try {
        const {courseName,courseDescription,price,whatYouWillLearn,category,tag}=req.body
        if(!courseName || !courseDescription || !price || !whatYouWillLearn || !category || !tag){
            return res.status(411).json({
                message:"All fields are required"
            })
        }
        const thumbnail=req.files.thumbnailImage;
        if(!thumbnail){
            return res.status(403).json({
                message:"Thumbnail not found"
            })
        }

        const checkcategory=await Category.findOne({_id:category})
        if(!checkcategory){
            return res.status(404).json({
                message:'Catgory is Invalid'
            })
        }
        //upload on cloudinary
        const fileresponse=await uploadFiles(thumbnail,process.env.FOLDER_NAME,100);
        console.log(fileresponse)

        const newCourse=await Course.create({courseName,courseDescription,price,whatYouWillLearn,thumbnail:fileresponse.secure_url,instructor:req.user.id,category,tag})

        await Category.findOneAndUpdate({_id:category},{
            $push:{
                course:newCourse._id
            }
        })

        await User.findOneAndUpdate({_id:req.user.id},{
            $push:{
                courses:newCourse._id
            }
        })
        return res.status(200).json({
            message:"Course created successfully",
            newCourse
        })

    } catch (error) {
        console.log(error)
        return res.status(403).json({
            message:"failed to create newcourse"
        })
    }
}

//getallcourse

exports.getAllCourse=async(req,res)=>{
    try {
        const allCourses=await Course.find({},{courseName:true,
                                                courseDescription:true,price:true,whatYouWillLearn:true,thumbnail:true,
                                                instructor:true,
                                                studentEnrolled:true
                                                }).populate("instructor").exec()
        return res.status(200).json({
            message:"successfully fetched all Courses",
            allCourses
        })
        
    } catch (error) {
         console.log(error)
        return res.status(403).json({
            message:"failed to fetched courses"
        })
    }
}

//getCourseDetails


exports.getCourseDetail=async(req,res)=>{
    try {
        const {courseId}=req.body;
        // or
        // const {courseId}=req.params
        const courseDetails=await Course.findById({_id:courseId}).populate({
            path:"instructor",
            populate:{
                path:"additionalDetails"
            }
        }).populate({
            path:"courseContent",
                populate:{
                    path:"subSection" 
                }
        }).populate("category").exec()
        
        if(!courseDetails){
            return res.status(404).json({
                message:`failed to fetch data with this ${courseId}`
            })
        }
        return res.status(200).json({
            message:"successfully fetched course details",
            courseDetails
        })

        
        
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            message:"failed to fetch course details"
        })
    }
}


