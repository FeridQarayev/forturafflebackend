const Subscribed = require("../models/subscribed.model");

exports.getAllAsync = async () => await Subscribed.find().select("_id email");

exports.getByIdAsync = async (id) =>
  await Subscribed.findById(id).select("_id email");

exports.existEmailAsync = async (email) => {
  email = email.toLowerCase();
  return (await Subscribed.findOne({ email }).count()) != 0 ? true : false;
};

exports.createAsync = async (subscribe) => await Subscribed.create(subscribe);

exports.deleteAsync = async (id) =>
  await Subscribed.findByIdAndDelete(id).select("_id email");
