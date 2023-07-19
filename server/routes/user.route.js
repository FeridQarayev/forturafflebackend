const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.post("/api/user/create", controller.create);

  app.put("/api/user/update", controller.update);
};
