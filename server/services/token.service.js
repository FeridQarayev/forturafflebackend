const jwt = require("jsonwebtoken");
const Token = require("../models/token.model");
require("dotenv").config();

const generateNewToken = (payloadObject) =>
  jwt.sign(payloadObject, process.env.TOKEN_KEY, {
    expiresIn: process.env.TOKEN_TIME,
  });

exports.createAsync = async (payloadObject, userId) =>
  await Token.create({
    token: generateNewToken(payloadObject),
    user: userId,
  });

exports.getTokenByIdAsync = async (tokenId) => await Token.findById(tokenId);

exports.updateAsync = async (payloadObject, tokenId) =>
  await Token.findOneAndUpdate(
    { _id: tokenId, isReset: false },
    {
      token: generateNewToken(payloadObject),
    },
    { new: true }
  );

exports.verifyToken = async (token) =>
  jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
    if (err) {
      return false;
    }
    return true;
  });
