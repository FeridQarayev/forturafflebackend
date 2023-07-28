const Joi = require("joi");

exports.getByIdValSchema = Joi.object({
  id: Joi.joiObjectid().required(),
});

exports.createValSchema = Joi.object({
  name: Joi.string().required(),
  price: Joi.number().required(),
  brand: Joi.string().required(),
  description: Joi.string().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  ticketCount: Joi.number().required(),
  ticketPrice: Joi.number().required(),
  categoryId: Joi.joiObjectid().required(),
});

exports.updateValSchema = Joi.object({
  id: Joi.joiObjectid().required(),
  name: Joi.string(),
  price: Joi.number(),
  brand: Joi.string(),
  description: Joi.string(),
  startDate: Joi.date(),
  endDate: Joi.date(),
  ticketCount: Joi.number(),
  ticketPrice: Joi.number(),
  categoryId: Joi.joiObjectid(),
});

exports.deleteValSchema = Joi.object({
  id: Joi.joiObjectid().required(),
});
