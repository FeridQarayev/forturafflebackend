const User = require("../models/user.model");
const Feedback = require("../models/feedback.model");
const mapping = require("../mappings/validate.map");
const feedbackValidate = require("../validators/feedback.validator");

exports.getAll = async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate({ path: "user", select: "-_id fullName" })
      .select("_id sendedAt");

    return res.status(200).send({
      message: "Successfully!",
      data: feedbacks,
    });
  } catch (err) {
    console.log("Feedback/GetAll:", err);
    return res.status(500).send(err);
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.query;

    const validate = mapping.mappingForReqQuery(
      req,
      feedbackValidate.getByIdValSchema
    );
    if (validate.valid)
      return res.status(422).send({ message: validate.message });

    const feedback = await Feedback.findById(id)
      .populate({ path: "user", select: "-_id fullName email" })
      .select("message sendedAt");
    if (!feedback)
      return res.status(404).send({ message: "Feedback not found!" });

    return res.status(200).send({
      message: "Successfully!",
      data: feedback,
    });
  } catch (err) {
    console.log("Feedback/GetById:", err);
    return res.status(500).send(err);
  }
};

exports.create = async (req, res) => {
  try {
    const { message, userId } = req.body;

    const validate = mapping.mapping(req, feedbackValidate.createValSchema);
    if (validate.valid)
      return res.status(422).send({ message: validate.message });

    const dbUserId = await User.findById(userId)
      .where("isActive", false)
      .select("_id");

    if (!dbUserId) return res.status(404).send({ message: "User not found!" });

    const feedback = await Feedback.create({
      message,
      user: dbUserId,
      sendedAt: new Date(),
    });

    return res.status(201).send({
      message: "Successfully created!",
      data: { message },
    });
  } catch (err) {
    console.log("Feedback/Create:", err);
    return res.status(500).send(err);
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.body;

    const validate = mapping.mapping(req, feedbackValidate.deleteValSchema);
    if (validate.valid)
      return res.status(422).send({ message: validate.message });

    const feedback = await Feedback.findByIdAndDelete(id)
      .populate({ path: "user", select: "-_id fullName email" })
      .select("message sendedAt");
    if (!feedback)
      return res.status(404).send({ message: "Feedback not found!" });

    return res.status(200).send({
      message: "Successfully deleted!",
      data: feedback,
    });
  } catch (err) {
    console.log("Feedback/Delete:", err);
    return res.status(500).send(err);
  }
};
