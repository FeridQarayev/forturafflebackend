const controller = require("../controllers/contact.controller");
const authMiddleware = require("../middlewares/auth.middleware");

module.exports = function (app) {
  app.get("/api/contact/getOne", authMiddleware.verifyToken, controller.getOne);

  app.post("/api/contact/create", authMiddleware.verifyToken, controller.create);
};
