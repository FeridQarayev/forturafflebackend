const User = require("../models/user.model");
const Role = require("../models/role.model");
const bcrypt = require("bcryptjs");
const mapping = require("../mappings/validate.map");
const userValidate = require("../validators/user.validator");
const jwtService = require("../services/token.service");

exports.getAll = async (req, res) => {
  try {
    const users = await User.find().select("_id firstName lastName email");

    return res.status(200).send({
      message: "Successfully!",
      data: users,
    });
  } catch (err) {
    console.log("User/GetAll:", err);
    return res.status(500).send(err);
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.query;

    const validate = mapping.mappingForReqQuery(
      req,
      userValidate.getByIdValSchema
    );
    if (validate.valid)
      return res.status(422).send({ message: validate.message });

    const user = await User.findById(id).select("_id firstName lastName email");
    if (!user) return res.status(404).send({ message: "User not found!" });

    return res.status(200).send({
      message: "Successfully!",
      data: user,
    });
  } catch (err) {
    console.log("User/GetById:", err);
    return res.status(500).send(err);
  }
};

exports.create = async (req, res) => {
  try {
    let { firstName, lastName, email, password, roleId } = req.body;

    const validate = mapping.mapping(req, userValidate.createValSchema);
    if (validate.valid)
      return res.status(422).send({ message: validate.message });

    email = email.toLowerCase();
    const existEmail = await User.findOne({ email })?.select("email");

    if (existEmail)
      return res.status(409).send({ message: "User Already Exist!" });

    const dbRoleId = await Role.findById(roleId).select("_id");

    if (!dbRoleId) return res.status(404).send({ message: "Role not found!" });

    const encryptedPassword = await bcrypt.hash(password, 10);

    const token = jwtService.create({ email });

    const user = await User.create({
      firstName,
      lastName,
      token,
      email: email,
      password: encryptedPassword,
      role: dbRoleId,
      createdAt: new Date(),
      isActive: false,
    });

    return res.status(201).send({
      message: "Successfully created!",
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        token: user.token,
      },
    });
  } catch (err) {
    console.log("User/Create:", err);
    return res.status(500).send(err);
  }
};

exports.update = async (req, res) => {
  try {
    let { id, firstName, lastName, email, password, roleId } = req.body;

    const validate = mapping.mapping(req, userValidate.updateValSchema);
    if (validate.valid)
      return res.status(422).send({ message: validate.message });

    const dbUserId = await User.findById(id)
      .where("isActive", false)
      .select("_id");
    if (!dbUserId) return res.status(404).send({ message: "User not found!" });

    if (email) {
      email = email.toLowerCase();
      const existEmail = await User.findOne({ email })?.select("email");
      if (existEmail)
        return res.status(409).send({ message: "User Already Exist!" });
    }
    if (roleId) {
      const dbRoleId = await Role.findById(roleId).select("_id");

      if (!dbRoleId)
        return res.status(404).send({ message: "Role not found!" });
    }
    let encryptedPassword = undefined;
    if (password) {
      encryptedPassword = await bcrypt.hash(password, 10);
    }

    const user = await User.findByIdAndUpdate(
      id,
      {
        firstName,
        lastName,
        email: email,
        password: encryptedPassword,
        role: roleId,
      },
      { new: true }
    ).select("firstName lastName email");

    return res.status(201).send({
      message: "Successfully updated!",
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (err) {
    console.log("User/Update:", err);
    return res.status(500).send(err);
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.body;

    const validate = mapping.mapping(req, userValidate.deleteValSchema);
    if (validate.valid)
      return res.status(422).send({ message: validate.message });

    const dbUser = await User.findByIdAndUpdate(id, {
      isActive: true,
    })
      .where("isActive", false)
      .select("firstName lastName email");
    if (!dbUser) return res.status(404).send({ message: "User not found!" });

    return res.status(200).send({
      message: "Successfully deleted!",
      data: dbUser,
    });
  } catch (err) {
    console.log("User/Delete:", err);
    return res.status(500).send(err);
  }
};
