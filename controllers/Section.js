//create

const Course = require("../models/Course");
const Section = require("../models/Section");

exports.createSection=async(req,res)=>{
    try {
        const {courseId,sectionName}=req.body;
       
        const newSection=await Section.create({sectionName});

        //update course

        await Course.findOneAndUpdate({_id:courseId},{
            $push:{
                courseContent:newSection._id
            }
        }).populate({
            path:"courseContent",
            populate:{
                path:"subSection"
            }
        })
        return res.status(200).json({
            message:"section created successfully",
            newSection,

        })

    } catch (error) {
        console.log(error)
        return res.status(404).json({
            success:false,
            message:"Failed to create new section"
        })
    }
}


//update

exports.sectionUpdate=async(req,res)=>{
    try {
        const {sectionName,sectionId}=req.body;
        if(!sectionName || !sectionId){
              return res.status(403).json({
                message:"All fields are required"
            })
        }
        await Section.findByIdAndUpdate({_id:sectionId},{sectionName});
        return res.json({
            message:"Section Name updated successfully"
        })
        
    } catch (error) {
         console.log(error)
        return res.status(404).json({
            success:false,
            message:"Failed to update section"
        })
    }
}


//delete

exports.sectionDelete=async(req,res)=>{
    try {
        const {courseId,sectionId}=req.body;
        if(!courseId || sectionId){
              return res.status(403).json({
                message:"All fields are required"
            })
        }
        await Section.findByIdAndDelete({_id:sectionId});

        await Course.findByIdAndUpdate({_id:courseId},{
            $pull:{
                courseContent:sectionId
            }
        })
        return res.json({
            message:"Section Deleted successfully"
        })
        
    } catch (error) {
         console.log(error)
        return res.status(404).json({
            success:false,
            message:"Failed to update section"
        })
    }
}