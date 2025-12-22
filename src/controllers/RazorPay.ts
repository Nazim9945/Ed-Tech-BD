// import  instanceRazorPay from '../config/razorpay'
// import  User from '../models/User'
// import  Course from '../models/Course'
// import mailsender from '../utils/mailsender'
// import type { Request , Response } from 'express'
// import mongoose from 'mongoose'
// import crypto, { randomUUID } from 'crypto'
// import type { Tokens } from 'RazorPay/dist/types/tokens'



// // will remove this soon
// type AuthRequest=Request & {user:{id:string}} 

// const capturePayments = async (req: AuthRequest, res: Response) => {
//     try {
        
//       const { courseId } = req.body
//       const userId = req.user.id;
//       if (!courseId || !userId) {
//         return res.status(404).json({
//           message: "course Id and userId is missing",
//         });
//       }
//     const courseDetails = await Course.findOne({ _id: courseId });
//     if (!courseDetails) {
//       return res.status(400).json({
//         message: "course id is invalid",
//       });
//     }

//     const newuserid = new mongoose.Types.ObjectId(userId);
//     if (courseDetails.studentEnrolled.includes(newuserid)) {
//       return res.status(404).json({
//         message: "You already enrolled in this course",
//       });
//     }
//     const options :{
//         amount:string | number,
//         currency:string,
//         receipt?:string,
//         notes?:{[key:string]: string | undefined},
//         customer_id:string,
//         token:Tokens.RazorpayTokenCard | Tokens.RazorpayTokenEmandate | Tokens.RazorpayTokenNach
//     } = {
//       // check here!!!!!!
//       amount: courseDetails.price ? courseDetails.price * 100 : 0,
//       currency: "INR",
//       // check here!!!
//       receipt:new Date().toString(),
//       notes: {
//           courseId,
//           userId,
//         },
//     customer_id:userId,
//     token:{
//         frequency:"1",
//         nach:{form_reference1: "anything1",
//                 form_reference2: "anything2",
//                 description: "anyhing3"}
//     }
//     };
//     // @ts-ignore
//     const captureResponse =instanceRazorPay.orders.create(options);
//     console.log(captureResponse);
//     return res.status(200).json({
//       success: true,
//       courseName: courseDetails.courseName,
//       courseDescription: courseDetails.courseDescription,
//       thumbnail: courseDetails.thumbnail,
//       price: captureResponse.price,
//       amount: captureResponse.amount,
//       orderId: captureResponse.id,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(404).json({
//       message: "could not initiate payment",
//     });
//   }
// };

// //will do tommorow---->lacking 

// const verifySignature = async (req: Request, res: Response) => {
//   try {
//     const signature = req.headers("x-razorpay-signature");
//     const shasum = crypto.createHmac("sha256", process.env.MY_SECRET_SIGNATURE);
//     shasum.update(JSON.stringify(req.body));
//     const digest = shasum.digest("hex");
//     if (signature === digest) {
//       const { courseId, userId } = req.body.payload.payment.entity.notes;
//       const courseResponse = await Course.findByIdAndUpdate(
//         { _id: courseId },
//         {
//           $push: {
//             studentEnrolled: userId,
//           },
//         },
//         { new: true }
//       );
//       const userResponse = await User.findByIdAndUpdate(
//         { _id: userId },
//         {
//           $push: {
//             course: courseId,
//           },
//         }
//       ).populate("courses");

//       await mailsender(
//         userResponse?.email,
//         "Successfull Enrollement",
//         `you have successfully enrolled in ${courseResponse?.courseName}`
//       );

//       return res.status(200).json({
//         message: "Student enrolled sucessfully",
//       });
//     }
//     return res.status(404).json({
//       message: "unauthorized signature",
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(411).json({
//       message: "Unauthorized signature",
//     });
//   }
// };

// export { capturePayments, verifySignature}