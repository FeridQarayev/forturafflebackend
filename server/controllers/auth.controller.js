const bcrypt = require("bcryptjs");
const mapping = require("../mappings/validate.map");
const userValidate = require("../validators/user.validator");
const tokenService = require("../services/token.service");
const userService = require("../services/user.service");
const roleService = require("../services/role.service");
const bcryptSalt = process.env.BCRYPT_SALT;

exports.register = async (req, res) => {
  try {
    let { fullName, email, phoneNumber, password } = req.body;

    const validate = mapping.mapping(req, userValidate.registerValSchema);
    if (validate.valid)
      return res.status(422).send({ message: validate.message });

    const existEmail = await userService.existEmailAsync(email);
    if (existEmail)
      return res.status(409).send({ message: "User already exist!" });

    const userRoleId = await roleService.getUserRoleIdAsync();
    if (!userRoleId)
      return res.status(404).send({ message: "User role not found!" });

    const encryptedPassword = await bcrypt.hash(password, Number(bcryptSalt));

    const token = tokenService.create({ email });

    const user = await userService.createAsync({
      fullName,
      token,
      email,
      phoneNumber,
      password: encryptedPassword,
      role: userRoleId,
      createdAt: new Date(),
      isActive: false,
    });

    return res.status(201).send({
      message: "Successfully registered!",
      data: {
        fullName: user.fullName,
        email: user.email,
        token: user.token,
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

    const validate = mapping.mapping(req, userValidate.loginValSchema);
    if (validate.valid)
      return res.status(422).json({ message: validate.message });

    const user = await userService.getUserForLoginAsync(email);
    if (!user) return res.status(404).send({ message: "User Not found!" });

    const passwordIsValid = bcrypt.compareSync(password, user.password);
    if (!passwordIsValid)
      return res.status(401).send({ message: "Invalid email or password!" });

    const token = tokenService.create({ email });

    await userService.findByIdAndUpdateAsync(user._id, { token });

    return res.status(200).send({
      message: "Welcome!",
      data: {
        fullName: user.fullName,
        email: user.email,
        token,
      },
    });
  } catch (err) {
    console.log("Auth/Login:", err);
    return res.status(500).send({ message: err });
  }
};
