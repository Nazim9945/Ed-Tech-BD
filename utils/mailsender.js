const nodemailer=require('nodemailer')
require('dotenv').config()
const mailsender=async(email,title,body)=>{
console.log( process.env.MAIL_HOST)
    try {
        const transporter = nodemailer.createTransport({
            // service:'gmail',
            host: process.env.MAIL_HOST,
            port: 587,
            secure: false, 
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            },

        });
        // 
        console.log(email,title)
        console.log("working till here")
        const info =await transporter.sendMail({
            from: "saifinazim2311@gmail.com",
            to:email,
            subject: `${title}`,
            html: body,
  });
  console.log("koi hai bhia idhar")
  console.log("inside mailsender",info);
  return info
        
    } catch (error) {
        // console.log(error)
        console.log(error.message)
    }





}
module.exports=mailsender