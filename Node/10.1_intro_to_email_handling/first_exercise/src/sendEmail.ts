// Exercise 1: Send an HTML Email

// TODO: Modify the sendEmail function to send an HTML email instead of plain text.

import nodemailer from "nodemailer";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();
async function sendSingleEmail(): Promise<void> {
  try {
    //create a reusable transporter using SMTP (for e.g., Gmail)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // use App Password if using Gmail

      },
    });

    const mailOptions = {
      from: '"My App" sg0024898.@gmail.com', // sender name and address
      to: "shivamsgupta2003@gmail.com",              // receiver
      subject: "Welcome to My App 🎉",
      // text: "Welcome to My App!", // plain text version (optional)
      html: `
        <div style="font-family: Arial, sans-serif; padding: 16px; color: #333;">
          <h2 style="color:#007bff;">Welcome to My App!</h2>
          <p>Hi there 👋,</p>
          <p>We're excited to have you on board.</p>
          <p>
            Click below to get started:
          </p>
          <a href="https://example.com" 
             style="background:#007bff;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;">
            Get Started
          </a>
          <p style="margin-top:20px;font-size:12px;color:#666;">
            &copy; 2025 My App, Inc. All rights reserved.
          </p>
        </div>
      `,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully! Message ID:", info.messageId);
  } catch (error: any) {
    console.error("❌ Error sending email:", error.message);
  }
}
// 4️⃣ Run the function
sendSingleEmail();