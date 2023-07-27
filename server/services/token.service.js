const jwt = require("jsonwebtoken");
const Token = require("../models/token.model");
require("dotenv").config();

const generateNewToken = (payloadObject) =>
  jwt.sign(payloadObject, process.env.TOKEN_KEY, {
    expiresIn: process.env.TOKEN_TIME,
  });

existTokenAsync = async (token) =>
  (await Token.where("isReset", false).findOne({ token }).count()) != 0
    ? true
    : false;

getTokenByIdAsync = async (tokenId) => await Token.findById(tokenId);

createAsync = async (payloadObject, userId) =>
  await Token.create({
    token: generateNewToken(payloadObject),
    user: userId,
  });

updateAsync = async (payloadObject, tokenId) =>
  await Token.findOneAndUpdate(
    { _id: tokenId, isReset: false },
    {
      token: generateNewToken(payloadObject),
    },
    { new: true }
  );

verifyTokenAsync = async (token) =>
  jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
    if (err) {
      return false;
    }
    return true;
  });

checkAndGenerateToken = async (tokenId, payloadObject, userId) => {
  let token = null;
  let isVerify = false;
  let isNew = false;
  token = await getTokenByIdAsync(tokenId);
  if (token) {
    isVerify = await verifyTokenAsync(token.token);
    if (!isVerify) token = await updateAsync(payloadObject, tokenId);
  } else {
    token = await createAsync(payloadObject, userId);
    isNew = true;
  }

  return { token, isNew };
};

const tokenService = {
  createAsync,
  getTokenByIdAsync,
  updateAsync,
  verifyTokenAsync,
  existTokenAsync,
  checkAndGenerateToken,
};
module.exports = tokenService;
