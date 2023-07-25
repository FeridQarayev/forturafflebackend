const User = require("../models/user.model");

exports.getAllAsync = async () =>
  await User.find().select("_id fullName email");

exports.getByIdAsync = async (id) =>
  await User.findById(id).select("_id fullName email");

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
