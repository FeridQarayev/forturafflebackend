const Joi = require("../config/npm.config").joi()


exports.registerValSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

exports.loginValSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

exports.createValSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  roleId: Joi.joiObjectid()
});
