const Joi = require("../config/npm.config").joi;

exports.registerValSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

exports.loginValSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

exports.getByIdValSchema = Joi.object({
  id: Joi.joiObjectid().required(),
});

exports.createValSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  roleId: Joi.joiObjectid().required(),
});

exports.updateValSchema = Joi.object({
  id: Joi.joiObjectid().required(),
  fullName: Joi.string(),
  email: Joi.string().email(),
  password: Joi.string(),
  roleId: Joi.joiObjectid(),
});

exports.deleteValSchema = Joi.object({
  id: Joi.joiObjectid().required(),
});
