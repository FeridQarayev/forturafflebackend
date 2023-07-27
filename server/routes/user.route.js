const controller = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

module.exports = function (app) {
  app.get("/api/user/getAll", authMiddleware.isAdminWithToken, controller.getAll);

  app.get("/api/user/getById", authMiddleware.verifyToken, controller.getById);

  app.post("/api/user/create", authMiddleware.isAdminWithToken, controller.create);

  app.put("/api/user/update", authMiddleware.isAdminWithToken, controller.update);

  app.delete("/api/user/delete", authMiddleware.isAdminWithToken, controller.delete);
};
