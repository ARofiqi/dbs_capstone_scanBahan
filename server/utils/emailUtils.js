const nodemailer = require("nodemailer");
const config = require("../config/default");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: config.emailMe,
    pass: config.passEmailMe,
  },
});

async function sendFeedbackEmail({ name, email, message }) {
  const mailOptions = {
    from: config.emailMe,
    to: config.emailMe,
    subject: `Scanbahan Feedback website dari ${name}`,
    html: `
    <h2>Feedback Baru untuk Website Scanbahan</h2>
    <p><strong>Nama:</strong> ${name}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Pesan:</strong><br>${message.replace(/\n/g, "<br>")}</p>
  `,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { sendFeedbackEmail };
