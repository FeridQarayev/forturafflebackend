const mapping = require("../mappings/validate.map");
const userValidate = require("../validators/user.validator");
const tokenService = require("../services/token.service");
const userService = require("../services/user.service");
const roleService = require("../services/role.service");
const passwordService = require("../services/password.service");

exports.getAll = async (req, res) => {
  try {
    const users = await userService.getAllAsync();

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

    const validate = mapping({ id }, userValidate.getByIdValSchema);
    if (validate.valid)
      return res.status(422).send({ message: validate.message });

    const user = await userService.getByIdAsync(id);
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
    let { fullName, email, phoneNumber, password, roleId } = req.body;

    const validate = mapping(
      { fullName, email, phoneNumber, password, roleId },
      userValidate.createValSchema
    );
    if (validate.valid)
      return res.status(422).send({ message: validate.message });

    const existEmail = await userService.existEmailAsync(email);

    if (existEmail)
      return res.status(409).send({ message: "Email already exist!" });

    const existRole = await roleService.existRoleAsync(roleId);
    if (!existRole) return res.status(404).send({ message: "Role not found!" });

    const encryptedPassword = await passwordService.hashingAsync(password);

    const user = await userService.createAsync({
      fullName,
      email,
      phoneNumber,
      password: encryptedPassword,
      role: roleId,
      createdAt: new Date(),
      isActive: false,
    });
    const token = await tokenService.createAsync({ email }, user._id);

    await userService.findByIdAndUpdateAsync(user._id, {
      $set: {
        token: token._id,
      },
    });

    return res.status(201).send({
      message: "Successfully created!",
      data: {
        fullName: user.fullName,
        email: user.email,
        token: token.token,
      },
    });
  } catch (err) {
    console.log("User/Create:", err);
    return res.status(500).send(err);
  }
};

exports.update = async (req, res) => {
  try {
    let { id, fullName, email, phoneNumber, password, roleId } = req.body;

    const validate = mapping(
      { id, fullName, email, phoneNumber, password, roleId },
      userValidate.updateValSchema
    );
    if (validate.valid)
      return res.status(422).send({ message: validate.message });

    const existUser = await userService.existUserAsync(id);
    if (!existUser) return res.status(404).send({ message: "User not found!" });

    if (email) {
      const existEmail = await userService.existEmailAsync(email);
      if (existEmail)
        return res.status(409).send({ message: "Email already exist!" });
    }
    if (roleId) {
      const existRole = await roleService.existRoleAsync(roleId);
      if (!existRole)
        return res.status(404).send({ message: "Role not found!" });
    }
    let encryptedPassword = undefined;
    if (password) {
      encryptedPassword = await passwordService.hashingAsync(password);
    }

    const user = await userService.findByIdAndUpdateAsync(id, {
      fullName,
      phoneNumber,
      email: email,
      password: encryptedPassword,
      role: roleId,
    });

    return res.status(201).send({
      message: "Successfully updated!",
      data: {
        fullName: user.fullName,
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

    const validate = mapping({ id }, userValidate.deleteValSchema);
    if (validate.valid)
      return res.status(422).send({ message: validate.message });

    const dbUser = await userService.findByIdAndUpdateAsync(id, {
      isActive: true,
    });
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
