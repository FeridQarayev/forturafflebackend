const Joi = require("joi");

exports.getByIdValSchema = Joi.object({
  id: Joi.joiObjectid().required(),
});

exports.createValSchema = Joi.object({
  email: Joi.string().email().required(),
});

exports.deleteValSchema = Joi.object({
  id: Joi.joiObjectid().required(),
});
