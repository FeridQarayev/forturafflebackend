const Joi = require("joi");

exports.sendValSchema = Joi.object({
  email: Joi.string().email().required(),
  subject: Joi.string().required(),
  text: Joi.string().required(),
});
