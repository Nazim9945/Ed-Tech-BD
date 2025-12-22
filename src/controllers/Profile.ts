//needs update->beacuse alredy added when user created
import Course from "../models/Course";
import Profile from "../models/Profile";
import User from "../models/User";
import uploadFiles from "../utils/uploadFiles";
import "dotenv/config";
import type { Request, Response } from "express";

type AuthRequest = Request & { user?: any };

export const updateProfile = async (
  req: AuthRequest,
  res: Response
): Promise<Response> => {
  try {
    const { gender, dateOfbirth, about, contactNumber } = req.body;

    const userId = req.user.id;

    if (!gender) {
      return res.status(400).json({
        message: "Please fill the gender field",
      });
    }

    const user = await User.findOne({ _id: userId });
    const profileId = user?.additionalDetails;
    const profile = await Profile.findById({ _id: profileId });

    if(profile){
      profile.dateOfbirth = dateOfbirth || profile?.dateOfbirth;
      profile.contactNumber = contactNumber || profile.contactNumber;
      profile.about = about || profile?.about;
      profile.gender = gender;
    }

    //needs changes here
    const profileDetails = await Profile.findByIdAndUpdate(
      { _id: profileId },
      {...profile},
      { new: true }
    );

    return res.status(200).json({
      message: "profile updated successfully",
      profileDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "failed to update the profile",
    });
  }
};

//deleteAccount

export const deleteAccount = async (
  req: AuthRequest,
  res: Response
): Promise<Response> => {
  const { courseId } = req.body;
  const userId = req.user.id;
  const role = req.user.accountType;
  try {
    //what if user just came to plateform and want to dlt account then
    //  must user  have a course id necessaary->NO
    if (!userId || !courseId || !role) {
      return res.status(400).json({
        message: "fields are missing",
      });
    }

    if (role === "Instructor") {
      return res.status(404).json({
        message: "At least one of the admin permission is require",
      });
    }
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({
        message: "No user data found",
      });
    }
    const profileId = user.additionalDetails;
    await Profile.findByIdAndDelete({ _id: profileId });
    if (role !== "Admin") {
      await Course.findByIdAndUpdate(
        { _id: courseId },
        {
          $pull: {
            studentEnrolled: userId,
          },
        }
      );
    }

    //cron-job try implementing scheduling task or api

    await User.findByIdAndDelete({ _id: userId });
    return res.json({
      message: "User account deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: `failed to delete ${role} account`,
    });
  }
};

//get user

export const getUserDetails = async (
  req: AuthRequest,
  res: Response
): Promise<Response> => {
  try {
    const id = req.user.id;
    const userDetails = await User.findOne({ _id: id })
      .populate("additionalDetails")
      .exec();
    if (!userDetails) {
      return res.status(400).json({
        message: "No User found",
      });
    }
    return res.status(200).json({
      message: "fetched all user details successfully",
      data: userDetails,
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: "failed to fetch user details",
    });
  }
};

//update profile pic

export const updateProfilePic = async (
  req: AuthRequest,
  res: Response
): Promise<Response> => {
  try {
    const userId = req.user.id;
    const file = req.files?.profilePic;
    if (!file) {
      return res.status(404).json({
        message: "File is missing",
      });
    }

    const uploadOnCloudinary = await uploadFiles(file, process.env.FOLDER_NAME as string);
    console.log(uploadOnCloudinary);
    const user = await User.findByIdAndUpdate(
      { _id: userId },
      {
        imageUrl: uploadOnCloudinary?.secure_url,
      },
      { new: true }
    );

    return res.json({
      message: "profile pic updated",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "failed to update profile pic",
    });
  }
};
