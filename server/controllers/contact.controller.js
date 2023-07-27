const Contact = require("../models/contact.model");
const mapping = require("../mappings/validate.map");
const contactValidate = require("../validators/contact.validator");

exports.getOne = async (req, res) => {
  try {
    const contact = await Contact.findOne()
      .sort({ createdAt: -1 })
      .select("number email instagram facebook twitter threads");

    return res.status(200).send({
      message: "Successfully!",
      data: contact,
    });
  } catch (err) {
    console.log("Contact/GetOne:", err);
    return res.status(500).send(err);
  }
};

exports.create = async (req, res) => {
  try {
    let { number, email, instagram, facebook, twitter, threads } = req.body;

    const validate = mapping(
      { number, email, instagram, facebook, twitter, threads },
      contactValidate.createValSchema
    );
    if (validate.valid)
      return res.status(422).send({ message: validate.message });

    email = email.toLowerCase();

    const contact = await Contact.create({
      number,
      email,
      instagram,
      facebook,
      twitter,
      threads,
      createdAt: new Date(),
    });

    return res.status(201).send({
      message: "Successfully created!",
      data: {
        number,
        email,
        instagram,
        facebook,
        twitter,
        threads,
      },
    });
  } catch (err) {
    console.log("Contact/Create:", err);
    return res.status(500).send(err);
  }
};
