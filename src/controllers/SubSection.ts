import SubSection from "../models/SubSection";
import Section from "../models/Section";
import uploadFiles from "../utils/uploadFiles";
import type {Request ,Response} from 'express'
export const createSubSection = async (req: Request, res: Response) => {
  try {
    const file = req.files?.videoFile;
    const { sectionId, title, description, timeDuration } = req.body;
    if (!file) {
      return res.status(404).json({
        message: "File is missing",
      });
    }
    //validation
    if (!sectionId || !title || !description || !timeDuration || !file) {
      return res.status(403).json({
        message: "All fields are required",
      });
    }
    const fileresponse = await uploadFiles(
      file,
      process.env.FOLDER_NAME as string
    );
    console.log(fileresponse);
    const newSubSection = await SubSection.create({
      title,
      description,
      vedioUrl: fileresponse?.secure_url,
      timeDuration,
    });

    await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $push: {
          subSection: newSubSection._id,
        },
      }
    );
    return res.status(200).json({
      message: "sub section created successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: "failed to create sub section",
    });
  }
};

//update
export const subSectionUpdate = async (req:Request,res:Response)=> {
  try {
    const { subSectionId, title, description } = req.body;
    await SubSection.findByIdAndUpdate(
      { _id: subSectionId },
      { title, description }
    );

    return res.status(200).json({
      message: "sub section updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: "failed to update sub section",
    });
  }
};

//delete

export const deleteSubSection = async (req: Request, res: Response) => {
  try {
    const { sectionId, subSectionId } = req.body;
    if (!sectionId || !subSectionId) {
      return res.status(403).json({
        message: "All fields are required",
      });
    }
    await SubSection.findByIdAndDelete({ _id: subSectionId });

    await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $pull: {
          subSection: subSectionId,
        },
      }
    );
    return res.status(200).json({
      message: "sub section deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: "failed to delete sub section",
    });
  }
};
