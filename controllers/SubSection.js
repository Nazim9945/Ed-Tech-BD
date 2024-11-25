//create
const SubSection=require('../models/SubSection')
// const Course=require('../models/Course');
const Section = require('../models/Section');
const { uploadFiles } = require('../utils/uploadFiles');
exports.createSubSection=async(req,res)=>{
    try {
        const {sectionId,title,description,timeDuration}=req.body;
        const file=req.body.vedioFile;

        //validation
        if(!sectionId || !title || !description || !timeDuration || !file){
            return res.status(403).json({
                message:"All fields are required"
            })
        }
        const fileresponse=uploadFiles(file,process.env.FOLDER_NAME,100)

        const newSubSection=await SubSection.create({title,description,vedioUrl:fileresponse.secure_url,timeDuration});

        await Section.findByIdAndUpdate({_id:sectionId},{
            $push:{
                subSection:newSubSection._id
            }
        })
        return res.status(200).json({
            message:"sub section created successfully"
        })
        
        
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            message:"failed to create sub section"
        })
    }
}



//update
exports.subSectionUpdate=async(req,res)=>{
    try {
        const {subSectionId,title,description}=req.body;
        await SubSection.findByIdAndUpdate({_id:subSectionId},{title,description});

        
        return res.status(200).json({
            message:"sub section updated successfully"
        })
        
        
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            message:"failed to update sub section"
        })
    }
}






//delete

exports.createSubSection=async(req,res)=>{
    try {
        const {sectionId,subSectionId}=req.body;
        if(!sectionId || !subSectionId){
              return res.status(403).json({
                message:"All fields are required"
            })
        }
       await SubSection.findByAndDelete({_id:subSectionId});

        await Section.findByIdAndUpdate({_id:sectionId},{
            $pull:{
                subSection:subSectionId
            }
        })
        return res.status(200).json({
            message:"sub section deleted successfully"
        })
        
        
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            message:"failed to delete sub section"
        })
    }
}
