const mapping = require("../mappings/validate.map");
const categoryValidate = require("../validators/category.validator");
const categoryService = require("../services/category.service");

exports.getAll = async (req, res) => {
  try {
    const categories = await categoryService.getAllAsync();

    return res.status(200).send({
      message: "Successfully!",
      data: categories,
    });
  } catch (err) {
    console.log("Category/GetAll:", err);
    return res.status(500).send(err);
  }
};

exports.create = async (req, res) => {
  try {
    const { name } = req.body;

    const validate = mapping({ name }, categoryValidate.createValSchema);
    if (validate.valid)
      return res.status(422).send({ message: validate.message });

    const category = await categoryService.createAsync({ name });

    return res.status(201).send({
      message: "Successfully created!",
      data: { name: category.name },
    });
  } catch (err) {
    console.log("Category/Create:", err);
    return res.status(500).send(err);
  }
};

exports.update = async (req, res) => {
  try {
    const { id, name } = req.body;

    const validate = mapping({ id, name }, categoryValidate.updateValSchema);
    if (validate.valid)
      return res.status(422).send({ message: validate.message });

    const existCategory = await categoryService.existAsync(id);
    if (!existCategory)
      return res.status(404).send({ message: "Category not found!" });

    const category = await categoryService.updateAsync(id, { name });

    return res.status(201).send({
      message: "Successfully updated!",
      data: {
        name: category.name,
      },
    });
  } catch (err) {
    console.log("Category/Update:", err);
    return res.status(500).send(err);
  }
};

exports.delete = async (req, res) => {
  try {
    const { id } = req.body;

    const validate = mapping({ id }, categoryValidate.deleteValSchema);
    if (validate.valid)
      return res.status(422).send({ message: validate.message });

    const category = await categoryService.updateAsync(id, {
      isActive: true,
    });
    if (!category)
      return res.status(404).send({ message: "Category not found!" });

    return res.status(200).send({
      message: "Successfully deleted!",
      data: category,
    });
  } catch (err) {
    console.log("Category/Delete:", err);
    return res.status(500).send(err);
  }
};
