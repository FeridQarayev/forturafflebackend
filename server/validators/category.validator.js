const Joi = require("joi");

exports.getByIdValSchema = Joi.object({
  id: Joi.joiObjectid().required(),
});

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
