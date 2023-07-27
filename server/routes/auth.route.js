const controller = require("../controllers/auth.controller");
const auth = require("../middlewares/auth.middleware");
// const smsService = require("../services/sms.service");

module.exports = function (app) {
  app.post("/api/verify", auth.verifyToken, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
  });

  app.post("/api/verifyadmin", auth.isAdmin, (req, res) => {
    res.status(200).send("Welcome Admin 🙌 ");
  });

  app.post("/api/verifyadmintoken", auth.isAdminWithToken, (req, res) => {
    res.status(200).send("Welcome Admin 🙌 ");
  });

  // app.post("/api/admintoken", [auth.verifyToken, auth.isAdmin], (req, res) => {
  //   res.status(200).send("Welcome Admin 🙌 ");
  // });
  // app.post("/api/send", async (req, res) => {
  //   const result = await smsService.smsSend(
  //     "+9940553725646",
  //     "Salam sms testi"
  //   );
  //   res.status(200).send(result.message);
  // });

  app.post("/api/register", controller.register);

  app.post("/api/login", controller.login);
};
