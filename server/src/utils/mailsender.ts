import nodemailer from 'nodemailer'
import 'dotenv/config'
const mailsender=async(email:string,title:string,body:string)=>{
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
        
    } catch (error:any) {
        // console.log(error)
        console.log(error.message)
    }





}
export default mailsender