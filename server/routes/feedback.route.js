const controller = require("../controllers/feedback.controller");

module.exports = function (app) {
  app.get("/api/feedback/getAll", controller.getAll);

  app.get("/api/feedback/getById", controller.getById);

  app.post("/api/feedback/create", controller.create);

  app.delete("/api/feedback/delete", controller.delete);
};
