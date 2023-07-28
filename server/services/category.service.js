const Category = require("../models/category.model");

exports.getAllAsync = async () =>
  await Category.find().select("_id name isActive");

exports.existAsync = async (id) =>
  (await Category.where("isActive", false).findById(id)?.count()) != 0
    ? true
    : false;

exports.createAsync = async (category) => await Category.create(category);

exports.updateAsync = async (id, category) =>
  await Category.where("isActive", false)
    .findByIdAndUpdate(id, category)
    .select("_id name");
