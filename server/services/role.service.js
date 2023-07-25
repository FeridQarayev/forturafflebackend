const Role = require("../models/role.model");

exports.getUserRoleIdAsync = async () =>
  await Role.findOne({ name: "user" }).select("_id");

exports.existRoleAsync = async (id) =>
  (await Role.findById(id).count()) != 0 ? true : false;
