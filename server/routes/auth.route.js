const controller = require("../controllers/auth.controller");
const auth = require("../middlewares/auth.middleware");
const mailService = require("../services/mail.service");

module.exports = function (app) {
  app.post("/api/verify", auth.verifyToken, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
  });

  // app.post("/api/verifyadmin", auth.isAdmin, (req, res) => {
  //   res.status(200).send("Welcome Admin 🙌 ");
  // });

  // app.post("/api/admintoken", [auth.verifyToken, auth.isAdmin], (req, res) => {
  //   res.status(200).send("Welcome Admin 🙌 ");
  // });

  app.get("/api/mail", async (req, res) => {
    const mail = await mailService.mailSendWithText(
      "tu7he6n9s@code.edu.az",
      "Wake up!",
      "Exam coming :) ihihh"
    );
    res.status(200).send(mail);
  });

  app.post("/api/register", controller.register);

  app.post("/api/login", controller.login);
};
