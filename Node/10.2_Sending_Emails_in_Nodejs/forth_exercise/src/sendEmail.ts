import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export interface EmailOptions{
     to: string;
  subject: string;
  html: string;
  attachments?: any[];
}

export async function sendEmail({to,subject,html,attachments=[]}:EmailOptions) {
   const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try{
const info = await transporter.sendMail({
      from: `"Your Newsletter" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
      attachments,
    });
    console.log(`✅ Email sent to ${to}: ${info.messageId}`);
  } catch (error) {
    console.error(`❌ Failed to send to ${to}:`, error);
  }
}