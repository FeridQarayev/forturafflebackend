const controller = require("../controllers/feedback.controller");
const authMiddleware = require("../middlewares/auth.middleware");

module.exports = function (app) {
  app.get("/api/feedback/getAll", authMiddleware.verifyToken, controller.getAll);

  app.get("/api/feedback/getById", controller.getById);

  app.post("/api/feedback/create", controller.create);

  app.delete("/api/feedback/delete", authMiddleware.verifyToken, controller.delete);
};
