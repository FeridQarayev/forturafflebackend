const mapping = require("../mappings/validate.map");
const productValidate = require("../validators/product.validator");
const productService = require("../services/product.service");
const categoryService = require("../services/category.service");
const productImageService = require("../services/product.image.service");
const imageService = require("../services/image.service");

exports.getAll = async (req, res) => {
  try {
    const products = await productService.getAllAsync();

    return res.status(200).send({
      message: "Successfully!",
      data: products,
    });
  } catch (err) {
    console.log("Product/GetAll:", err);
    return res.status(500).send(err);
  }
};

exports.getById = async (req, res) => {
  try {
    const { id } = req.query;

    const validate = mapping({ id }, productValidate.getByIdValSchema);
    if (validate.valid)
      return res.status(422).send({ message: validate.message });

    const product = await productService.getByIdAsync(id);
    if (!product)
      return res.status(404).send({ message: "Product not found!" });

    return res.status(200).send({
      message: "Successfully!",
      data: product,
    });
  } catch (err) {
    console.log("Product/GetById:", err);
    return res.status(500).send(err);
  }
};

exports.create = async (req, res, next) => {
  const { files } = req;
  try {
    const {
      name,
      price,
      brand,
      description,
      startDate,
      endDate,
      ticketCount,
      ticketPrice,
      categoryId,
    } = req.body;

    const reqObject = {
      name,
      price,
      brand,
      description,
      startDate,
      endDate,
      ticketCount,
      ticketPrice,
      categoryId,
    };

    const validate = mapping(reqObject, productValidate.createValSchema);
    if (validate.valid) {
      imageService.deleteFiles(files);
      return res.status(422).send({ message: validate.message });
    }

    const category = await categoryService.getByIdAsync(categoryId);
    if (!category) {
      imageService.deleteFiles(files);
      return res.status(404).send({ message: "Category not found!" });
    }

    const images = [];

    req.files.forEach((file) =>
      images.push({ path: file.filename, isMain: false })
    );
    images[0].isMain = true;

    const productImages = await productImageService.createManyAsync(images);

    const product = await productService.createAsync({
      ...reqObject,
      categoryId: undefined,
      category: categoryId,
      productImages: productImages.map((productImage) => productImage._id),
    });

    await categoryService.updateAsync(categoryId, {
      $push: {
        products: product._id,
      },
    });

    return res.status(201).send({
      message: "Successfully created!",
      data: product,
    });
  } catch (err) {
    console.log("Product/Create:", err);
    imageService.deleteFiles(files);
    return res.status(500).send(err);
  }
};

exports.update = async (req, res) => {
  try {
    const {
      id,
      name,
      price,
      brand,
      description,
      startDate,
      endDate,
      ticketCount,
      ticketPrice,
      categoryId,
    } = req.body;

    const reqObject = {
      id,
      name,
      price,
      brand,
      description,
      startDate,
      endDate,
      ticketCount,
      ticketPrice,
      categoryId,
    };

    const validate = mapping(reqObject, productValidate.updateValSchema);
    if (validate.valid)
      return res.status(422).send({ message: validate.message });

    const oldProduct = await productService.getByIdAsync(id);
    if (!oldProduct)
      return res.status(404).send({ message: "Product not found!" });

    if (categoryId) {
      const existCategory = await categoryService.existAsync(categoryId);
      if (!existCategory)
        return res.status(404).send({ message: "Category not found!" });

      await categoryService.updateAsync(oldProduct.category._id, {
        $pull: {
          products: id,
        },
      });

      await categoryService.updateAsync(categoryId, {
        $push: {
          products: id,
        },
      });
    }

    const product = await productService.updateAsync(id, {
      ...reqObject,
      categoryId: undefined,
      category: categoryId,
    });

    return res.status(201).send({
      message: "Successfully updated!",
      data: product,
    });
  } catch (err) {
    console.log("Product/Update:", err);
    return res.status(500).send(err);
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.body;

    const validate = mapping({ id }, productValidate.deleteValSchema);
    if (validate.valid)
      return res.status(422).send({ message: validate.message });

    const product = await productService.updateAsync(id, {
      isActive: true,
    });
    if (!product)
      return res.status(404).send({ message: "Product not found!" });

    return res.status(200).send({
      message: "Successfully deleted!",
      data: product,
    });
  } catch (err) {
    console.log("Product/Delete:", err);
    return res.status(500).send(err);
  }
};
