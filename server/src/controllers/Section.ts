//create

import type { Request ,Response } from "express";
import Course from "../models/Course";
import Section from "../models/Section";

export const createSection = async (req: Request, res: Response) => {
  try {
    const { courseId, sectionName } = req.body;

    const newSection = await Section.create({ sectionName });

    //update course

    const courseUpdate = await Course.findOneAndUpdate(
      { _id: courseId },
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true }
    ).populate({
      path: "courseContent",
      populate: {
        path: "subSection",
      },
    });
    return res.status(200).json({
      message: "section created successfully",
      courseUpdate,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success: false,
      message: "Failed to create new section",
    });
  }
};

//update

export const sectionUpdate = async (req: Request, res: Response) => {
  try {
    const { sectionName, sectionId } = req.body;
    if (!sectionName || !sectionId) {
      return res.status(403).json({
        message: "All fields are required",
      });
    }
    await Section.findByIdAndUpdate({ _id: sectionId }, { sectionName });
    return res.json({
      message: "Section Name updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success: false,
      message: "Failed to update section",
    });
  }
};

//delete

export const sectionDelete = async (req: Request, res: Response) => {
  try {
    const { courseId, sectionId } = req.body;
    if (!courseId || sectionId) {
      return res.status(403).json({
        message: "All fields are required",
      });
    }
    await Section.findByIdAndDelete({ _id: sectionId });

    await Course.findByIdAndUpdate(
      { _id: courseId },
      {
        $pull: {
          courseContent: sectionId,
        },
      }
    );
    return res.json({
      message: "Section Deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success: false,
      message: "Failed to update section",
    });
  }
};

//getall section

export const getAllSection = async (req:Request,res:Response)=> {
  try {
    const allsection = await Section.find({});
    return res.status(200).json({
      message: "fecthed all section",
      allsection,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: "failed to fecthed sections",
    });
  }
};
