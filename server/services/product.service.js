const Product = require("../models/product.model");

exports.getAllAsync = async () =>
  await Product.find().select("_id name startDate endDate ticketCount");

exports.existAsync = async (id) =>
  (await Product.where("isActive", false).findById(id)?.count()) != 0
    ? true
    : false;

exports.createAsync = async (product) => await Product.create(product);

exports.updateAsync = async (id, product) =>
  await Product.where("isActive", false)
    .findByIdAndUpdate(id, product, { new: true })
    .select("_id name startDate endDate ticketCount");
