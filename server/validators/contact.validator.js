const Joi = require("../config/npm.config").joi;
const phonePattern = /^\+9940?(40|5[015]|60|7[07])\d{7}$/;

exports.createValSchema = Joi.object({
  number: Joi.string().regex(phonePattern).required(),
  email: Joi.string().email().required(),
  instagram: Joi.string().required(),
  facebook: Joi.string().required(),
  twitter: Joi.string().required(),
  threads: Joi.string().required(),
});
