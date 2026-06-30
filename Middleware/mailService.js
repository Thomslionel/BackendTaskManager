// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// function sendMail(to, subject, text) {
//   return transporter.sendMail({
//     from: `"Task Manager" <${process.env.EMAIL_USER}>`,
//     to,
//     subject,
//     text,
//   });
// }

// module.exports = { sendMail };


const { Resend } = require("resend");

const resend = new Resend(process.env.API_KEY);

async function sendMail(to, subject, message) {
  try {
    const response = await resend.emails.send({
      from: "onboarding@resend.dev", // email de test
      to: [to],
      subject: subject,
      text: message,
    });

    console.log("Email envoyé:", response);
    return response;
  } catch (error) {
    console.error("Erreur envoi email:", error);
    throw error;
  }
}

module.exports = { sendMail };