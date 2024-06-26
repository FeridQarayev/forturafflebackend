const jwt = require("jsonwebtoken");
const Token = require("../models/token.model");
require("dotenv").config();

const maxResetTokenMinute = 15;

const generateNewToken = (payloadObject) =>
  jwt.sign(payloadObject, process.env.TOKEN_KEY, {
    expiresIn: process.env.TOKEN_TIME,
  });

const existTokenAsync = async (token) =>
  (await Token.where("isReset", false).findOne({ token }).count()) != 0
    ? true
    : false;

const getTokenByIdAsync = async (tokenId) => await Token.findById(tokenId);

const createAsync = async (payloadObject, userId) =>
  await Token.create({
    token: generateNewToken(payloadObject),
    user: userId,
  });

const createResetAsync = async (userId, encryptedCode) => {
  const code = await Token.findOne({
    user: userId,
    isReset: true,
  }).select("_id token modifiedAt");
  if (code) {
    return (
      await Token.findByIdAndUpdate(
        code._id,
        { token: encryptedCode, modifiedAt: new Date() },
        { new: true }
      )
    )?.token;
  } else {
    return (
      await Token.create({
        token: encryptedCode,
        user: userId,
        isReset: true,
      })
    )?.token;
  }
};

const verifyResetCodeAsync = async (userId, code) =>
  await Token.findOne({ user: userId, token: code, isReset: true }).select(
    "_id token modifiedAt"
  );

const isExpired = (date) => {
  const minute = Math.floor(Math.abs(new Date() - date) / 1000 / 60);
  return minute <= maxResetTokenMinute ? true : false;
};

const updateAsync = async (payloadObject, tokenId) =>
  await Token.findOneAndUpdate(
    { _id: tokenId, isReset: false },
    {
      token: generateNewToken(payloadObject),
      modifiedAt: new Date(),
    },
    { new: true }
  );

const verifyTokenAsync = async (token) =>
  jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
    if (err) {
      return false;
    }
    return true;
  });

const checkAndGenerateToken = async (tokenId, payloadObject, userId) => {
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

const isAdminToken = async (token) =>
  (
    await Token.where("isReset", false)
      .findOne({ token })
      .select("-_id user")
      .populate({
        path: "user",
        model: "User",
        match: { isActive: false },
        select: "-_id role",
        populate: {
          path: "role",
          model: "Role",
          match: { name: "admin" },
          select: "-_id name",
        },
      })
  )?.user?.role != null
    ? true
    : false;

const removeTokenAsync = async (tokenId) =>
  await Token.findByIdAndDelete(tokenId);

const tokenService = {
  checkAndGenerateToken,
  verifyResetCodeAsync,
  getTokenByIdAsync,
  removeTokenAsync,
  verifyTokenAsync,
  createResetAsync,
  existTokenAsync,
  isAdminToken,
  createAsync,
  updateAsync,
  isExpired,
};
module.exports = tokenService;
