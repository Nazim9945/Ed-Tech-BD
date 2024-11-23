const nodemailer=require('nodemailer')
const mailsender=async(email,title,body)=>{

    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: 587,
            secure: false, 
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            },

        });
        const info = await transporter.sendMail({
            from: "StudyPathway",
            to: email,
            subject: title,
            html: body
  });
  console.log(info);
  return info
        
    } catch (error) {
        
        console.log(error.message)
    }





}
module.exports=mailsender