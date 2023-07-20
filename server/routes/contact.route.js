const controller = require("../controllers/contact.controller");

module.exports = function (app) {
  app.get("/api/contact/getOne", controller.getOne);

  app.post("/api/contact/create", controller.create);
};
