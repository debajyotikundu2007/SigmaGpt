import nodemailer from "nodemailer";

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