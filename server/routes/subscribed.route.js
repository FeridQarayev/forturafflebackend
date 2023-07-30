const controller = require("../controllers/subscribed.controller");
// const authMiddleware = require("../middlewares/auth.middleware");

module.exports = function (app) {
  app.get("/api/subscribed/getAll", controller.getAll);

  app.get("/api/subscribed/getById", controller.getById);

  app.post("/api/subscribed/create", controller.create);

  app.delete("/api/subscribed/delete", controller.delete);
};
