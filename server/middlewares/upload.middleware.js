const imageService = require("../services/image.service");

exports.uploadMultiple = async (req, res, next) => {
  try {
    imageService.upload.array("files", 5)(req, res, async (err) => {
      if (err) return res.status(422).send({ message: err.message });

      const files = req.files;
      if (!files)
        return res.status(422).send({ message: "files is required!" });

      const validateErrors = await imageService.validateMultipleFile(files);

      if (validateErrors.length > 0) {
        imageService.deleteFiles(files);
        return res.status(422).send({ message: validateErrors?.join(",") });
      }

      req.files = files;
      next();
    });
  } catch (err) {
    console.log("Upload/Multiple:", err);
    return res.status(500).send(err);
  }
};

exports.uploadSingle = (req, res, next) => {
  try {
    imageService.upload.single("file")(req, res, async (err) => {
      if (err) return res.status(422).send({ message: err.message });
      else {
        const file = req.file;
        if (!file)
          return res.status(422).send({ message: "file is required!" });

        const validateErrors = await imageService.validateSingleFile(file);

        if (validateErrors.length > 0) {
          imageService.deleteFile(file);
          return res.status(422).send({ message: validateErrors?.join(",") });
        }

        req.file = file;
        next();
      }
    });
  } catch (error) {
    console.log("Upload/Single:", err);
    return res.status(500).send(err);
  }
};
