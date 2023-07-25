const Role = require("../models/role.model");

exports.existRoleAsync = async (id) =>
  (await Role.findById(id).count()) != 0 ? true : false;
