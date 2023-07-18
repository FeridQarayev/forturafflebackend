const controller = require("../controllers/auth.controller");
const auth = require("../middlewares/auth.middleware");

module.exports = function (app) {
  app.post("/api/verify", auth.verifyToken, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
  });

  app.post("/api/verifyadmin", auth.isAdmin, (req, res) => {
    res.status(200).send("Welcome Admin 🙌 ");
  });

  app.post("/api/admintoken", [auth.verifyToken, auth.isAdmin], (req, res) => {
    res.status(200).send("Welcome Admin 🙌 ");
  });

  app.post("/api/register", controller.register);
};
