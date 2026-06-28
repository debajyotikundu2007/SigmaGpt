import * as Brevo from "@getbrevo/brevo";

const apiInstance = new Brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  Brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

export async function sendEmail(to, subject, text, html) {
  try {

    console.log("Sending email using Brevo API...");

    const emailData = new Brevo.SendSmtpEmail();

    emailData.sender = {
      name: "SigmaGPT",
      email: process.env.SENDER_EMAIL,
    };

    emailData.to = [
      {
        email: to,
      },
    ];

    emailData.subject = subject;
    emailData.textContent = text;
    emailData.htmlContent = html;

    const response =
      await apiInstance.sendTransacEmail(emailData);

    console.log("Email sent successfully!");
    console.log(response);

    return response;

  } catch (err) {

    console.error("Brevo API Error:");
    console.error(err);

    throw err;
  }
}