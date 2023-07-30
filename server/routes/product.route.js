const controller = require("../controllers/product.controller");
const uploadMiddleware = require("../middlewares/upload.middleware");
// const authMiddleware = require("../middlewares/auth.middleware");

module.exports = function (app) {
  app.get("/api/product/getAll", controller.getAll);

  app.get("/api/product/getById", controller.getById);

  app.post(
    "/api/product/create",
    uploadMiddleware.uploadMultiple,
    controller.create
  );

  app.delete("/api/product/delete", controller.delete);
};
