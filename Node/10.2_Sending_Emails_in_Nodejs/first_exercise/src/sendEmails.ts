// Exercise 3: Validate Email Addresses

// TODO: Use regex to validate email addresses before sending emails.

import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

function isValidEmail(email:string):boolean{
    // Basic RFC 5322-compliant pattern (good enough for most use cases)
    const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/; // ^ ->start $->end
    return emailRegex.test(email);
}

async function sendSingleEmail(recipient: string): Promise<void> {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: `"My App" <${process.env.EMAIL_USER}>`,
        to: recipient,
        subject: "🎉 Welcome to My App!",
        html: `
      <div style="font-family: Arial, sans-serif; padding: 16px;">
        <h2>Hello, ${recipient.split("@")[0]} 👋</h2>
        <p>We’re happy to have you here!</p>
      </div>
    `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent to: ${recipient}`);
}

async function sendBulkEmails(recipients: string[]): Promise<void> {
    try {
        const validEmails= recipients.filter(isValidEmail);
        const invalidEmails = recipients.filter(email => !isValidEmail(email));

         // Log results
    if (invalidEmails.length > 0) {
      console.warn("⚠️ Skipping invalid emails:", invalidEmails);
    }

    // 2️⃣ Send only to valid addresses
    await Promise.all(validEmails.map(sendSingleEmail));

    console.log("🚀 All valid emails sent successfully!");

    } catch (error: any) {
    console.error("❌ Error during bulk send:", error.message);
  }
}


const recipientList=[
  "shivamsgupta2003@gmail.com",
  "sg0024898@gmail.com"
]
// 4️⃣ Run the function
sendBulkEmails(recipientList);