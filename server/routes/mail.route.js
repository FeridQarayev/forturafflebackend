const controller = require("../controllers/mail.controller");
const authMiddleware = require("../middlewares/auth.middleware");

module.exports = function (app) {
  app.post("/api/mail/text", authMiddleware.verifyToken, controller.sendText);

  app.post("/api/mail/html", authMiddleware.verifyToken, controller.sendHTML);
};
