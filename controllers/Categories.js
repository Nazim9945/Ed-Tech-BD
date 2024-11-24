
const Category = require("../models/category");

exports.createCategory=async(req,res)=>{
    try {
        const {name,description}=req.body;

        if(!name || !description){
            return res.status(402).json({
                message:'All fields are required!'
            })
        }

        const response=await Category.create({name,description});
        return res.status(200),json({

            message:"Category created successfully",
            response
        })
        
    } catch (error) {
        console.log(error);
        return res.status(403).json({
            message:"error while creating category"
        })
    }
}

exports.showAllCategories=async(req,res)=>{
    try {
        const allCategory=await Category.find({},{name:true,description:true});
        return res.status(200).json({
            message:"successfully fetched all categories",
            allCategory
        })
        
    } catch (error) {
         console.log(error);
        return res.status(403).json({
            message:"error while fetching category"
        })
    }
}