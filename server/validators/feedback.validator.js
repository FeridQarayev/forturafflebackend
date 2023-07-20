const Joi = require("../config/npm.config").joi;

exports.getByIdValSchema = Joi.object({
  id: Joi.joiObjectid().required(),
});

exports.createValSchema = Joi.object({
  message: Joi.string().required(),
  userId: Joi.joiObjectid().required(),
});

exports.deleteValSchema = Joi.object({
  id: Joi.joiObjectid().required(),
});
