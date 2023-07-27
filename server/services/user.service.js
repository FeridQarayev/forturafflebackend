const User = require("../models/user.model");

exports.getAllAsync = async () => {
  const users = await User.find()
    .select("_id fullName email")
    .populate({
      path: "token",
      select: "-_id token",
      match: { isReset: false },
    });
  const usersVM = users.map((user) => ({
    _id: user._id,
    fullname: user.fullName,
    email: user.email,
    token: user.token.token,
  }));
  return usersVM;
};

exports.getByIdAsync = async (id) => {
  let user = await User.findById(id)
    .select("_id fullName email")
    .populate({
      path: "token",
      select: "-_id token",
      match: { isReset: false },
    });
  return {
    _id: user._id,
    fullname: user.fullName,
    email: user.email,
    token: user.token.token,
  };
};

exports.verifyAdminAsync = async (email) =>
  (
    await User.where("isActive", false)
      .findOne({ email })
      .select("-_id role")
      .populate({
        path: "role",
        select: "-_id name",
        match: { name: "admin" },
      })
  )?.role != null
    ? true
    : false;

exports.getByEmailAsync = async (email) => {
  email = email.toLowerCase();
  return await User.findOne({ email })
    .where("isActive", false)
    .select("_id fullName email password token");
};

exports.existUserAsync = async (id) =>
  (await User.where("isActive", false).findOne({ _id: id }).count()) != 0
    ? true
    : false;

exports.existEmailAsync = async (email) => {
  email = email.toLowerCase();
  return (await User.findOne({ email }).count()) != 0 ? true : false;
};

exports.createAsync = async (user) => await User.create(user);

exports.findByIdAndUpdateAsync = async (id, user) =>
  await User.findByIdAndUpdate(id, user, { new: true })
    .where("isActive", false)
    .select("fullName email");
