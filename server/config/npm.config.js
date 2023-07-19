const Joi = require("joi");
Joi.joiObjectid = require("joi-objectid")(Joi);

exports.joi = Joi;
