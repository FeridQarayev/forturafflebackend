const controller = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

module.exports = function (app) {
  app.get("/api/user/getAll", controller.getAll);

  app.get("/api/user/getById",authMiddleware.verifyToken, controller.getById);

  app.post("/api/user/create", [authMiddleware.verifyToken, authMiddleware.isAdmin], controller.create);

  app.put("/api/user/update", controller.update);

  app.delete("/api/user/delete",[authMiddleware.verifyToken, authMiddleware.isAdmin], controller.delete);
};
