const mapping = require("../mappings/validate.map");
const subscribedValidate = require("../validators/subscribed.validator");
const subscribedService = require("../services/subscribed.service");

exports.getAll = async (req, res) => {
  try {
    const subscribers = await subscribedService.getAllAsync();

    return res.status(200).send({
      message: "Successfully!",
      data: subscribers,
    });
  } catch (err) {
    console.log("Subscribed/GetAll:", err);
    return res.status(500).send(err);
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.query;

    const validate = mapping({ id }, subscribedValidate.getByIdValSchema);
    if (validate.valid)
      return res.status(422).send({ message: validate.message });

    const subscriber = await subscribedService.getByIdAsync(id);
    if (!subscriber)
      return res.status(404).send({ message: "Subscriber not found!" });

    return res.status(200).send({
      message: "Successfully!",
      data: subscriber,
    });
  } catch (err) {
    console.log("Subscribed/GetById:", err);
    return res.status(500).send(err);
  }
};

exports.create = async (req, res) => {
  try {
    let { email } = req.body;

    const validate = mapping({ email }, subscribedValidate.createValSchema);
    if (validate.valid)
      return res.status(422).send({ message: validate.message });

    email = email.toLowerCase();
    const existSubscriber = await subscribedService.existEmailAsync(email);
    if (existSubscriber)
      return res.status(409).send({ message: "Subscriber already exist!" });

    const subscriber = await subscribedService.createAsync({ email });

    return res.status(201).send({
      message: "Successfully created!",
      data: { email: subscriber.email },
    });
  } catch (err) {
    console.log("Subscribed/Create:", err);
    return res.status(500).send(err);
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.body;

    const validate = mapping({ id }, subscribedValidate.deleteValSchema);
    if (validate.valid)
      return res.status(422).send({ message: validate.message });

    const subscriber = await subscribedService.deleteAsync(id);
    if (!subscriber)
      return res.status(404).send({ message: "Subscriber not found!" });

    return res.status(200).send({
      message: "Successfully deleted!",
      data: subscriber,
    });
  } catch (err) {
    console.log("Subscribed/Delete:", err);
    return res.status(500).send(err);
  }
};
