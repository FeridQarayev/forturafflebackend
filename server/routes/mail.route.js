const controller = require("../controllers/mail.controller");

module.exports = function (app) {
  app.post("/api/mail/text", controller.sendText);

  app.post("/api/mail/html", controller.sendHTML);
};
