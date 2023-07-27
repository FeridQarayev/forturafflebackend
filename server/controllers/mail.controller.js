const User = require("../models/user.model");
const mapping = require("../mappings/validate.map");
const mailValidate = require("../validators/mail.validator");
const mailService = require("../services/mail.service");

exports.sendText = async (req, res) => {
  try {
    let { email, subject, text } = req.body;

    const validate = mapping(
      { email, subject, text },
      mailValidate.sendValSchema
    );
    if (validate.valid)
      return res.status(422).send({ message: validate.message });

    email = email.toLowerCase();

    const dbUserEmail = await User.findOne({ email })
      .where("isActive", false)
      .select("email");

    if (!dbUserEmail)
      return res.status(404).send({ message: "Email not found!" });

    const mail = await mailService.mailSendWithText(email, subject, text);

    return res
      .status(200)
      .send({ message: "Mail successfully sended!", data: mail });
  } catch (err) {
    console.log("Mail/SendText:", err);
    return res.status(500).send(err);
  }
};

exports.sendHTML = async (req, res) => {
  try {
    let { email, subject, text } = req.body;

    const validate = mapping(
      { email, subject, text },
      mailValidate.sendValSchema
    );
    if (validate.valid)
      return res.status(422).send({ message: validate.message });

    email = email.toLowerCase();

    const dbUserEmail = await User.findOne({ email })
      .where("isActive", false)
      .select("email");

    if (!dbUserEmail)
      return res.status(404).send({ message: "Email not found!" });

    const mail = await mailService.mailSendWithHTML(email, subject, text);

    return res
      .status(200)
      .send({ message: "Mail successfully sended!", data: mail });
  } catch (err) {
    console.log("Mail/SendHTML:", err);
    return res.status(500).send(err);
  }
};
