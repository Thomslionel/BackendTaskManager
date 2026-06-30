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


const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,            // 1. Basculer sur le port 465
  secure: true,         // 2. secure doit être 'true' pour le port 465
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  // Les options réseaux de sécurité
  connectionTimeout: 20000,
  greetingTimeout: 20000,
  socketTimeout: 20000,
  family: 4,            // 3. ESSENTIEL sur Render : force la résolution IPv4
});

function sendMail(to, subject, text) {
  return transporter.sendMail({
    from: `"Task Manager" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  });
}

module.exports = { sendMail };