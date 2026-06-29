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
  port: 587,
  secure: false, // false pour le port 587 (STARTTLS)
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Assurez-vous qu'il s'agit d'un "Mot de passe d'application" Gmail
  },
  // Optionnel : Forcer Node à préférer l'IPv4 si l'hébergeur a des soucis de routage IPv6
  connectionTimeout: 10000, // 10 secondes max pour se connecter
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