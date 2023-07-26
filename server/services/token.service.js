const jwt = require("jsonwebtoken");
const Token = require("../models/token.model");
require("dotenv").config();

const generateNewToken = (payloadObject) =>
  jwt.sign(payloadObject, process.env.TOKEN_KEY, {
    expiresIn: process.env.TOKEN_TIME,
  });

createAsync = async (payloadObject, userId) =>
  await Token.create({
    token: generateNewToken(payloadObject),
    user: userId,
  });

getTokenByIdAsync = async (tokenId) => await Token.findById(tokenId);

updateAsync = async (payloadObject, tokenId) =>
  await Token.findOneAndUpdate(
    { _id: tokenId, isReset: false },
    {
      token: generateNewToken(payloadObject),
    },
    { new: true }
  );

verifyToken = async (token) =>
  jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
    if (err) {
      return false;
    }
    return true;
  });

checkAndGenerateToken = async (tokenId, payloadObject, userId) => {
  let token = null;
  let isVerify = false;
  token = await getTokenByIdAsync(tokenId);
  if (token) {
    isVerify = await verifyToken(token.token);
    if (!isVerify) token = await updateAsync(payloadObject, tokenId);
  } else token = await createAsync(payloadObject, userId);

  return token;
};

const tokenService = {
  createAsync,
  getTokenByIdAsync,
  updateAsync,
  verifyToken,
  checkAndGenerateToken,
};
module.exports = tokenService;
