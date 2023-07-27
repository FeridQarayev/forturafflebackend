const mapping = require("../mappings/validate.map");
const userValidate = require("../validators/user.validator");
const tokenService = require("../services/token.service");
const userService = require("../services/user.service");
const roleService = require("../services/role.service");
const passwordService = require("../services/password.service");

exports.register = async (req, res) => {
  try {
    let { fullName, email, phoneNumber, password } = req.body;

    const validate = mapping(
      { fullName, email, phoneNumber, password },
      userValidate.registerValSchema
    );
    if (validate.valid)
      return res.status(422).send({ message: validate.message });

    const existEmail = await userService.existEmailAsync(email);
    if (existEmail)
      return res.status(409).send({ message: "User already exist!" });

    const userRoleId = await roleService.getUserRoleIdAsync();
    if (!userRoleId)
      return res.status(404).send({ message: "User role not found!" });

    const encryptedPassword = await passwordService.hashingAsync(password);

    const user = await userService.createAsync({
      fullName,
      email,
      phoneNumber,
      password: encryptedPassword,
      role: userRoleId,
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
      message: "Successfully registered!",
      data: {
        fullName: user.fullName,
        email: user.email,
        token: token.token,
      },
    });
  } catch (err) {
    console.log("Auth/Register:", err);
    return res.status(500).send(err);
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const validate = mapping({ email, password }, userValidate.loginValSchema);
    if (validate.valid)
      return res.status(422).json({ message: validate.message });

    const user = await userService.getUserForLoginAsync(email);
    if (!user) return res.status(404).send({ message: "User Not found!" });

    const passwordIsValid = await passwordService.compareAsync(
      password,
      user.password
    );
    if (!passwordIsValid)
      return res.status(401).send({ message: "Invalid email or password!" });

    let token = null;
    if (user.token) {
      const result = await tokenService.checkAndGenerateToken(
        user.token,
        { email },
        user._id
      );
      token = result.token;
      if (result.isNew)
        await userService.findByIdAndUpdateAsync(user._id, {
          $set: {
            token: token._id,
          },
        });
    } else {
      token = await tokenService.createAsync({ email }, user._id);
      await userService.findByIdAndUpdateAsync(user._id, {
        $set: {
          token: token._id,
        },
      });
    }

    return res.status(200).send({
      message: "Welcome!",
      data: {
        fullName: user.fullName,
        email: user.email,
        token: token.token,
      },
    });
  } catch (err) {
    console.log("Auth/Login:", err);
    return res.status(500).send({ message: err });
  }
};
