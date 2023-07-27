const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const bcryptSalt = process.env.BCRYPT_SALT;

exports.hashingAsync = async (password) =>
  await bcrypt.hash(password, Number(bcryptSalt));

exports.compareAsync = async (password, newPassword) =>
  await bcrypt.compare(password, newPassword);

exports.resetPasswordAsync = () =>
  crypto.randomBytes(4).toString("hex").toUpperCase();
