const ProductImage = require("../models/product.image.model");

// exports.getAllAsync = async () =>
//   await Product.find().select("_id name startDate endDate ticketCount");

// exports.getByIdAsync = async (id) =>
//   await Product.findById(id).select(
//     "_id name startDate endDate ticketCount category"
//   );

// exports.existAsync = async (id) =>
//   (await Product.where("isActive", false).findById(id)?.count()) != 0
//     ? true
//     : false;


exports.createManyAsync = async (productImages) =>
  await ProductImage.insertMany(productImages);

// exports.updateAsync = async (id, product) =>
//   await Product.where("isActive", false)
//     .findByIdAndUpdate(id, product, { new: true })
//     .select("_id name startDate endDate ticketCount");
