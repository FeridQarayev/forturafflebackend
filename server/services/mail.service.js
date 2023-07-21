const nodemailer = require("nodemailer");
require("dotenv").config();

const email = process.env.EMAIL;

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  auth: {
    user: email,
    pass: process.env.EMAIL_PASSWORD,
  },
  secure: process.env.SECURE,
});

exports.mailSendWithText = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: email,
      to: to,
      subject: subject,
      text: text,
    };

    const info = await transporter.sendMail(mailOptions);
    return { status: true, message: info.messageId };
  } catch (error) {
    console.log("MailSendWithText", error);
    return { status: false, message: "Could not be sent!" };
  }
};

exports.mailSendWithHTML = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: email,
      to: to,
      subject: subject,
      html: text,
    };

    const info = await transporter.sendMail(mailOptions);
    return { status: true, message: info.messageId };
  } catch (error) {
    console.log("MailSendWithHTML", error);
    return { status: false, message: "Could not be sent!" };
  }
};

exports.mailSendMultiple = async (toes, subject, text) => {
  try {
    const messageIds = [];
    toes.forEach(async (to) => {
      const mailOptions = {
        from: email,
        to: to,
        subject: subject,
        html: text,
      };

      const info = await transporter.sendMail(mailOptions);
      messageIds.push(info.messageId);
    });
    return { status: true, message: messageIds };
  } catch (error) {
    console.log("MailSendMultiple", error);
    return { status: false, message: "Could not be sent!" };
  }
};
