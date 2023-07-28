const controller = require("../controllers/category.controller");
// const authMiddleware = require("../middlewares/auth.middleware");

module.exports = function (app) {
  app.get("/api/category/getAll", controller.getAll);

  //   app.get("/api/category/getById", controller.getById);

  app.post("/api/category/create", controller.create);

  app.put("/api/category/update", controller.update);

  app.delete("/api/category/delete", controller.delete);
};
