const multer = require("multer");
const path = require("path");
const fs = require("fs");
const FOLDER = "images/product";
const MAX_SIZE = 2 * 1024 * 1024;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, FOLDER);
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const checkFileType = (file, cb) => {
  const allowedTypes = [".png", ".jpg", ".jpeg"];
  const ext = path.extname(file.originalname);
  if (!allowedTypes.includes(ext))
    return cb(new Error("Only images are allowed!"));

  cb(null, true);
};

exports.upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => checkFileType(file, cb),
  limits: { files: 5, fileSize: MAX_SIZE },
});

exports.validateSingleFile = async (file) => {
  const errors = [];

  const allowedTypes = ["image/jpeg", "image/png"];

  if (!allowedTypes.includes(file.mimetype))
    errors.push(`Invalid file type: ${file.originalname}`);

  if (file.size > MAX_SIZE) errors.push(`File too large: ${file.originalname}`);

  return errors;
};

exports.validateMultipleFile = async (files) => {
  const errors = [];

  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

  files.forEach((file) => {
    if (!allowedTypes.includes(file.mimetype))
      errors.push(`Invalid file type: ${file.originalname}`);

    if (file.size > MAX_SIZE)
      errors.push(`File too large: ${file.originalname}`);
  });

  return errors;
};

exports.deleteFile = (file) => fs.unlinkSync(file.path);

exports.deleteFiles = (files) =>
  files.forEach((file) => fs.unlinkSync(file.path));
