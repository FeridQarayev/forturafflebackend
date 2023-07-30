const Category = require("../models/category.model");

exports.getAllAsync = async () =>
  await Category.find().select("_id name isActive");

exports.getByIdAsync = async (id) =>
  await Category.findById(id)
    .where("isActive", false)
    .select("_id name isActive");

exports.existAsync = async (id) =>
  (await Category.where("isActive", false).findById(id)?.count()) != 0
    ? true
    : false;

exports.createAsync = async (category) => await Category.create(category);

exports.updateAsync = async (id, category) =>
  await Category.findByIdAndUpdate(id, category)
    .where("isActive", false)
    .select("_id name");
