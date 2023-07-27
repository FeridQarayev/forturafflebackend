const jwt = require("jsonwebtoken");
const Token = require("../models/token.model");
require("dotenv").config();

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

const updateAsync = async (payloadObject, tokenId) =>
  await Token.findOneAndUpdate(
    { _id: tokenId, isReset: false },
    {
      token: generateNewToken(payloadObject),
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

const tokenService = {
  createAsync,
  getTokenByIdAsync,
  updateAsync,
  verifyTokenAsync,
  existTokenAsync,
  checkAndGenerateToken,
  isAdminToken,
};
module.exports = tokenService;
