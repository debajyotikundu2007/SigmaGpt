import nodemailer from "nodemailer";
console.log("BREVO_USER =", process.env.BREVO_USER);
console.log("NODE_ENV =", process.env.NODE_ENV);
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false,
  
  auth: {
    user: process.env.BREVO_USER,
    pass: process.env.BREVO_PASS,
  },
});

export async function sendEmail(to, subject, text, html) {
  try {
    console.log("Trying to connect to Brevo...");
    const info = await transporter.sendMail({
      from: `"SigmaGPT" <${process.env.BREVO_USER}>`,
      to,
      subject,
      text,
      html,
    });

    console.log("Email sent:", info.messageId);
    return info;

  } catch (err) {
    console.error("Error sending email:", err);
    throw err;
  }
}