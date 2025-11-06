import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { sendEmail } from "./sendEmail.ts";

async function main() {

    const __filename=fileURLToPath(import.meta.url);
    const __dirname=path.dirname(__filename);
    const imagePath=path.join(__dirname,"images","logo.jpg");// <-- your local image

      const html = `
    <div style="font-family: Arial, sans-serif;">
      <h2>Welcome to Our Newsletter!</h2>
      <p>Here’s our latest update:</p>
      <img src="cid:newsletter_logo" alt="Newsletter Logo" style="width:200px;"/>
      <p>Stay tuned for more great content!</p>
    </div>
  `;
  await sendEmail({
    to: "sg0024898@gmail.com",
    subject: "📰 Embedded Image Test",
    html,
    attachments: [
      {
        filename: "logo.jpg",
        path: imagePath,  // local file path
        cid: "newsletter_logo", // same as the one used in HTML src
      },
    ],
  });
}

main();