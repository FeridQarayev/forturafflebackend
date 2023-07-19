const User = require("../models/user.model");
const Role = require("../models/role.model");
const bcrypt = require("bcryptjs");
const mapping = require("../mappings/validate.map");
const userValidate = require("../validators/user.validator");
const jwtService = require("../services/token.service");

exports.register = async (req, res) => {
  try {
    let { firstName, lastName, email, password } = req.body;

    const validate = mapping.mapping(req, userValidate.registerValSchema);
    if (validate.valid)
      return res.status(422).send({ message: validate.message });

    email = email.toLowerCase();
    const existEmail = await User.findOne({ email })?.select("email");

    if (existEmail)
      return res
        .status(409)
        .send({ message: "User Already Exist! Please Login" });

    const userRoleId = await Role.findOne({ name: "user" }).select("_id");

    if (!userRoleId)
      return res.status(404).send({ message: "User role not found!" });

    //Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create token
    const token = jwtService.create({ email });

    const user = await User.create({
      firstName,
      lastName,
      token,
      email: email,
      password: encryptedPassword,
      role: userRoleId,
      createdAt: new Date(),
      isActive: false,
    });

    // return new user
    return res.status(201).send({
      message: "Successfully registered!",
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
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
  const { email, password } = req.body;

  const validate = mapping.mapping(req, userValidate.loginValSchema);
  if (validate.valid)
    return res.status(422).json({ message: validate.message });

  await User.findOne({ email })
    .where("isActive", false)
    .select("_id firstName lastName email password token")
    .then(async (user) => {
      if (!user) return res.status(404).send({ message: "User Not found!" });

      const passwordIsValid = bcrypt.compareSync(password, user.password);
      if (!passwordIsValid)
        return res.status(401).send({ message: "Invalid email or password!" });

      const token = jwtService.create({ email });

      await User.findByIdAndUpdate(user._id, { token });

      return res.status(200).send({
        message: "Welcome!",
        data: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          token,
        },
      });
    })
    .catch((err) => {
      console.log("Auth/Login:", err);
      return res.status(500).send({ message: err });
    });
};
