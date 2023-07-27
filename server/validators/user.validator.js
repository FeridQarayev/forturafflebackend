const Joi = require("joi");
const phonePattern = /^\+9940?(40|5[015]|60|7[07])\d{7}$/;
Joi.joiObjectid = require("joi-objectid")(Joi);

exports.registerValSchema = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().regex(phonePattern).required(),
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
  phoneNumber: Joi.string().regex(phonePattern).required(),
  password: Joi.string().required(),
  roleId: Joi.joiObjectid().required(),
});

exports.updateValSchema = Joi.object({
  id: Joi.joiObjectid().required(),
  fullName: Joi.string(),
  email: Joi.string().email(),
  phoneNumber: Joi.string().regex(phonePattern),
  password: Joi.string(),
  roleId: Joi.joiObjectid(),
});

exports.deleteValSchema = Joi.object({
  id: Joi.joiObjectid().required(),
});

exports.isAdminValSchema = Joi.object({
  adminEmail: Joi.string().email().required(),
});
