const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.create = (payloadObject) => {
  return jwt.sign(payloadObject, process.env.TOKEN_KEY, {
    expiresIn: process.env.TOKEN_TIME,
  });
};