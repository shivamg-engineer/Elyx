import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { sendEmail } from "./sendEmail.ts";


interface Subscriber {
  email: string;
  name: string;
}

const __filename=fileURLToPath(import.meta.url);
const __dirname= path.dirname(__filename);

const subscriberspath= path.join(__dirname,"subscribers.json");
const subscribers:Subscriber[]=JSON.parse(fs.readFileSync(subscriberspath,"utf-8"));

async function main() {
    const subject = "📰 This Week’s Newsletter!";
  const htmlTemplate = (name: string) => `
    <h2>Hello ${name},</h2>
    <p>Welcome to this week's newsletter! Here's what's new:</p>
    <ul>
      <li>🔥 Latest news about our platform</li>
      <li>💡 Productivity tips</li>
      <li>🎁 Special offers for subscribers</li>
    </ul>
    <p>See you next week!</p>
  `;

  for(const subscriber of subscribers){
    await sendEmail({
        to:subscriber.email,
        subject,
        html:htmlTemplate(subscriber.name),
    });

    // optional delay to avoid hitting SMTP rate limits
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
   console.log("✅ All emails sent!");
}

main();