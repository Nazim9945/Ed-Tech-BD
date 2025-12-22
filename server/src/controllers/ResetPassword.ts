//resetpasswordtoken
// flow
// user click on forgot pwd----> screen pop-up and ask email----> mail sent along with token ---->

import type { Request ,Response } from "express";
import User from "../models/User";
import mailsender from "../utils/mailsender";
import bcrypt from "bcrypt";
import crypto from "crypto";

const resetpasswordtoken = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email)
      return res.status(403).json({
        message: "This field is required!",
      });

    //verify email
    const isExist = await User.findOne({ email: email });
    if (!isExist) {
      return res.status(400).json({
        message: "This email is not registered!",
      });
    }

    //token generate
    const token = crypto.randomUUID();

    //enter token in user
    await User.findOneAndUpdate(
      { email: email },
      { token, resetTokenExpires: Date.now() + 5 * 60 * 1000 }
    );

    //frontend url created
    const url = `http://localhost:3000/update-password/${token}`;

    //mail sent
    mailsender(
      email,
      "RESET YOUR PASSWORD",
      `You can reset your password through this link ${url}`
    );

    //res
    return res.status(200).json({
      message: "Password reset link sent successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: "error while initiate reset password",
    });
  }
};

//resetpasswordupdate
//here
//token->find email throgh token and update

const resetpasswordupdate = async (req: Request, res: Response) => {
  try {
    const { newpassword, confirmnewpassword, token } = req.body;
    if (!token) {
      return res.status(404).json({
        message: "token is invalid, you can not update the password!",
      });
    }
    if (!newpassword || !confirmnewpassword) {
      return res.status(404).json({
        message: "All fields are required!",
      });
    }

    if (newpassword !== confirmnewpassword) {
      return res.status(404).json({
        message: "Password is not matching",
      });
    }

    //check token expiration time

    const user = await User.findOne({ token: token });
// check here!!!!!!!!
    if (user?.resetTokenExpires && new Date() > user.resetTokenExpires) {
      return res.status(404).json({
        message: "This token is expired, please regenerate your token",
      });
    }
    //hashpassword

    const hashpwd = await bcrypt.hash(newpassword, 10);

    await User.findOneAndUpdate({ token: token }, { password: hashpwd });

    return res.status(200).json({
      message: "Password reset successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: "error while update forgot password",
    });
  }
};

// exports functions

export { resetpasswordtoken, resetpasswordupdate };
