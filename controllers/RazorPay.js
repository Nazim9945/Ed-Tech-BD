const instanceRazorPay=require('../config/razorpay')
const User=require('../models/User')
const Course=require('../models/Course')
const mailsender=require('../utils/mailsender')

exports.capturePayments=async(req,res)=>{
    const {courseId}=req.body;
    const userId=req.user.id;
    if(!courseId){
        return res.status(404).json({
            message:"course Id is missing"
        })
    }
    try {
        const courseDetails=await Course.findOne({_id:courseId});
        if(!courseDetails){
            return res.status(400).json({
                message:"course id is invalid"
            })
        }

        const newuserid=new mongoose.Types.ObjectId(userId);
        if(courseDetails.studentEnrolled.includes(newuserid)){
            return res.status(404).json({
                message:"You already enrolled in this course"
            })
        }
        const options={
            amount:courseDetails.price * 100,
            currency:"INR",
            reciept_no:Math.random(Date.now()).toString(),
            notes:{
                courseId,
                userId
            }
        }
        const captureResponse=await instanceRazorPay.order.create(options);
        console.log(captureResponse);
        return res.status(200).json({
            success:true,
            courseName:courseDetails.courseName,
            courseDescription:courseDetails.courseDescription,
            thumbnail:courseDetails.thumbnail,
            price:captureResponse.price,
            amount:captureResponse.amount,
            orderId:captureResponse.id

        })
    } catch (error) {
        console.log(error)
        return res.status(404).json({
            message:"could not initiate payment"
        })
    }
}

//will do tommorow---->lacking 

exports.verifySignature=async(req,res)=>{
    try {
        const signature=req.headers('x-razorpay-signature')
        const shasum=crypto.createHmac("sha256",process.env.MY_SECRET_SIGNATURE);
        shasum.update(JSON.stringify(req.body));
        const digest=shasum.digest('hex');
        if(signature===digest){
            const {courseId,userId}=req.body.payload.payment.entity.notes;
            const courseResponse=await Course.findByIdAndUpdate({_id:courseId},{
                $push:{
                    studentEnrolled:userId
                }
            },{new:true})
            const userResponse=await User.findByIdAndUpdate({_id:userId},{
                $push:{
                    course:courseId
                }
            }).populate("courses")

            await mailsender(userResponse.email,"Successfull Enrollement",`you have successfully enrolled in ${courseResponse.courseName}`)

            return res.status(200).json({
                message:"Student enrolled sucessfully"
            })
        }
        return res.status(404).json({
            message:"unauthorized signature"
        })

        
    } catch (error) {
        console.log(error)
        return res.status(411).json({
            message:"Unauthorized signature"
        })
    }
}