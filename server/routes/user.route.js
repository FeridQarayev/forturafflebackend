const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.get("/api/user/getAll", controller.getAll);

  app.get("/api/user/getById", controller.getById);

  app.post("/api/user/create", controller.create);

  app.put("/api/user/update", controller.update);

  app.delete("/api/user/delete", controller.delete);
};
