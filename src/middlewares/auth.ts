//auth
import jwt, { type JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";
import type { NextFunction, Request, Response } from "express";
interface payload extends JwtPayload{
        id:string,
        accountType:"Student" | "Admin" | "Instructor",
        email:string


}
type AuthRequest=Request & {user?:payload}
export const auth = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    let token = req.cookies.token;
    console.log(token);
    if (!token) {
      return res.status(404).json({
        success: false,
        message: "token is missing",
      });
    }
    // token = token.split("Bearer ")[1];
    console.log(token);
    try {
      let decode = jwt.verify(token, process.env.JWT_SECRET as string) as payload;
      console.log(decode);
   
      req.user = decode;

      next();
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        message: "Invalid token",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success: false,
      message: "error while authenticate",
    });
  }
};

//isStudent
export const isStudent = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (req.user?.accountType != "Student") {
      return res.status(404).json({
        message: "This route is protected for Student",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success: false,
      message: "error while verifying route",
    });
  }
};

//isAdmin
export const isAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    if (req.user?.accountType != "Admin") {
      return res.status(404).json({
        message: "This route is protected for Admin",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success: false,
      message: "error while verifying route",
    });
  }
};

//isInstructor
export const isInstructor = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.user?.accountType != "Instructor") {
      return res.status(404).json({
        message: "This route is protected for Instructor",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      success: false,
      message: "error while verifying route",
    });
  }
};
