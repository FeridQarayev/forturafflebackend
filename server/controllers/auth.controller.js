const mapping = require("../mappings/validate.map");
const userValidate = require("../validators/user.validator");
const tokenService = require("../services/token.service");
const userService = require("../services/user.service");
const roleService = require("../services/role.service");
const passwordService = require("../services/password.service");
const mailService = require("../services/mail.service");

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

    const user = await userService.getByEmailAsync(email);
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

exports.resetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const validate = mapping({ email }, userValidate.resetPasswordValSchema);
    if (validate.valid)
      return res.status(422).json({ message: validate.message });

    const user = await userService.getByEmailAsync(email);
    if (!user) return res.status(404).send({ message: "User Not found!" });

    const encryptedPassword = passwordService.resetPasswordAsync();

    const code = await tokenService.createResetAsync(
      user._id,
      encryptedPassword
    );
    const subject = "Reset Password";
    const text = `
    <h1> Need to reset your password?</h1>
    <br>
    <p> Use your secret code! </p>
    <br>
    <b>[${code}]</b>
    <br>
    <p>
    If you did not request a new password, please let us know immediately by replying to this email.
    </p>
    <br>
    &- The Forturaffle team 
    `;
    const mail = await mailService.mailSendWithHTML(email, subject, text);
    return res.status(200).send({
      message: "We have sent you a password recovery email!",
      data: subject,
    });
  } catch (err) {
    console.log("Auth/ResetPassword:", err);
    return res.status(500).send({ message: err });
  }
};

exports.confirmResetPassword = async (req, res) => {
  try {
    const { email, code } = req.body;

    const validate = mapping(
      { email, code },
      userValidate.confirmResetPasswordValSchema
    );
    if (validate.valid)
      return res.status(422).json({ message: validate.message });

    const user = await userService.getByEmailAsync(email);
    if (!user) return res.status(404).send({ message: "User Not found!" });

    const verifyCode = await tokenService.verifyResetCodeAsync(user._id, code);
    if (!verifyCode)
      return res.status(401).send({ message: "Code is not correct!" });

    const isExpired = tokenService.isExpired(verifyCode.modifiedAt);
    if (!isExpired) return res.status(408).send({ message: "Timeout code!" });

    return res.status(200).send({
      message: "Code is correct!",
      data: "Code is correct!",
    });
  } catch (err) {
    console.log("Auth/ConfirmResetPassword:", err);
    return res.status(500).send({ message: err });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { email, code, password } = req.body;

    const validate = mapping(
      { email, code, password },
      userValidate.changePasswordValSchema
    );
    if (validate.valid)
      return res.status(422).json({ message: validate.message });

    const user = await userService.getByEmailAsync(email);
    if (!user) return res.status(404).send({ message: "User Not found!" });

    const verifyCode = await tokenService.verifyResetCodeAsync(user._id, code);
    if (!verifyCode)
      return res.status(401).send({ message: "Code is not correct!" });

    const isExpired = tokenService.isExpired(verifyCode.modifiedAt);
    if (!isExpired) return res.status(408).send({ message: "Timeout code!" });

    const encryptedPassword = await passwordService.hashingAsync(password);

    await userService.findByIdAndUpdateAsync(user._id, {
      password: encryptedPassword,
    });
    await tokenService.removeTokenAsync(verifyCode._id);

    return res.status(200).send({
      message: "Password changed successfully!",
      data: "Password changed successfully!",
    });
  } catch (err) {
    console.log("Auth/ChangePassword:", err);
    return res.status(500).send({ message: err });
  }
};
