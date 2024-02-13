const nodemailer = require("nodemailer");

const user = {
  email: "drinkstop.no.reply@gmail.com",
  password: "sipp lbiw khdu qats",
};

function sendEmail({ email, subject, text }) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: user.email,
      pass: user.password,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  const mailOptions = {
    from: user.email,
    to: email,
    subject: subject,
    text: text,
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log("Error " + err);
    } else {
      console.log("Email sent successfully" + info.response);
    }
  });
}

module.exports = { sendEmail };
