const Joi = require("joi");

exports.createValSchema = Joi.object({
  name: Joi.string().required(),
});

exports.updateValSchema = Joi.object({
  id: Joi.joiObjectid().required(),
  name: Joi.string(),
});

exports.deleteValSchema = Joi.object({
  id: Joi.joiObjectid().required(),
});
