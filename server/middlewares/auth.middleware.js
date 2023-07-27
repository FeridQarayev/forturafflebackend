const tokenService = require("../services/token.service");
const userService = require("../services/user.service");
const mapping = require("../mappings/validate.map");
const userValidate = require("../validators/user.validator");

exports.verifyToken = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token)
    return res
      .status(403)
      .send({ message: "A token is required for authentication" });

  const isVerify = await tokenService.verifyTokenAsync(token);
  if (!isVerify) return res.status(401).send({ message: "Unauthorized!" });

  const existToken = await tokenService.existTokenAsync(token);
  if (!existToken) return res.status(404).send({ message: "Token not found!" });

  next();
};

exports.isAdmin = async (req, res, next) => {
  const { adminEmail } = req.body;

  const validate = mapping(
    { adminEmail },
    userValidate.isAdminValSchema
  );
  if (validate.valid)
    return res.status(422).send({ message: validate.message });

  const verifyAdmin = await userService.verifyAdminAsync(adminEmail);
  if (!verifyAdmin)
    return res.status(403).send({ message: "Require Admin Role!" });

  next();
};
