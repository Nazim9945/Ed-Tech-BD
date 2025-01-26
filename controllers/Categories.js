
const Category = require("../models/Category");

exports.createCategory=async(req,res)=>{
    try {
        const {name,description}=req.body;

        if(!name || !description){
            return res.status(402).json({
                message:'All fields are required!'
            })
        }

        const response=await Category.create({name,description});
        return res.status(200).json({

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


//categoryPageDetails

exports.categoryPageDetails=async(req,res)=>{
    try {
        const {categoryId}=req.body;


        //fetched all category specified courses
        const selectedCategory=await Category.findById({_id:categoryId}).populate("course").exec();

        if(!selectedCategory){
            console.log(error);
            return res.status(403).json({
                message:"Data not found"
            })
        }

        //different category

        const diffCategoryCourse=await Category.findById({_id:{$ne:categoryId}}).populate("course").exec();
        

         if(!diffCategoryCourse){
            console.log(error);
            return res.status(403).json({
                message:"Data not found"
            })
        }

        //all top selling courses
        const allCategories=await Category.find({}).populate("courses");

        const allCourses= allCategories.flatMap(cat=>cat.course);
        //needs a variable to determine which course is top-selling
        //TODO:


    } catch (error) {
        console.log(error);
        return res.status(403).json({
            message:"error while fetching category page details"
        })
    }
}