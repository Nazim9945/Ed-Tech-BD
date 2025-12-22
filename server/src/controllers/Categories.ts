import type { Request, Response } from "express";

import Category  from "../models/Category"

const createCategory=async(req:Request,res:Response)=>{
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

const showAllCategories = async (req: Request, res: Response) => {
  try {
    const allCategory = await Category.find(
      {},
      { name: true, description: true }
    );
    return res.status(200).json({
      message: "successfully fetched all categories",
      allCategory,
    });
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      message: "error while fetching category",
    });
  }
};


//categoryPageDetails

const categoryPageDetails = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.body;

    //fetched all category specified courses
    const selectedCategory = await Category.findById({ _id: categoryId })
      .populate("course")
      .exec();

    if (!selectedCategory) {
      
      return res.status(403).json({
        message: "Data not found",
      });
    }

    //different category

    const diffCategoryCourse = await Category.findById({
      _id: { $ne: categoryId },
    })
      .populate("course")
      .exec();

    if (!diffCategoryCourse) {
     
      return res.status(403).json({
        message: "Data not found",
      });
    }

    //all top selling courses
    const allCategories = await Category.find({}).populate("courses");

    const allCourses = allCategories.flatMap((cat) => cat.course);
    //needs a variable to determine which course is top-selling
    //TODO:
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      message: "error while fetching category page details",
    });
  }
};

export { createCategory, categoryPageDetails , showAllCategories};