export async function sendEmail(to, subject, text, html) {
  try {
    console.log("Sending email using Brevo HTTP API...");

    const response = await fetch(
      "https://api.brevo.com/v3/smtp/email",
      {
        method: "POST",

        headers: {
          "accept": "application/json",
          "content-type": "application/json",
          "api-key": process.env.BREVO_API_KEY,
        },

        body: JSON.stringify({
          sender: {
            name: "SigmaGPT",
            email: process.env.SENDER_EMAIL,
          },

          to: [
            {
              email: to,
            },
          ],

          subject: subject,
          textContent: text,
          htmlContent: html,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Brevo Error:", data);
      throw new Error(data.message || "Failed to send email");
    }

    console.log("Email sent successfully!");
    console.log(data);

    return data;

  } catch (err) {
    console.error("Email sending failed:");
    console.error(err);

    throw err;
  }
}