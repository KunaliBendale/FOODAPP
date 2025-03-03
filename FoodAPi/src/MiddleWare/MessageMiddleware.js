import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config();

const sendMessage=async (email, message)=>{
    console.log(email,message);
    const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
          user: process.env.EMAIL_USER, //email
          pass: process.env.EMAIL_PASS, //app password (enable 2-FA)
        },
      });
      
      
      const mailOptions = {
        from: process.env.EMAIL_USER, 
        to: email, 
        subject: 'Your PassCode',
        text: message, 
       
      };
  
      // Send email
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ');
  
      return info.response
      
}

export {sendMessage}