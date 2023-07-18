const mongoose = require("mongoose");
require("dotenv").config();

const { HOST, USER, PASSWORD, DB, DIALECT } = process.env;
mongoose.set("strictQuery", false);

exports.connect = () => {
  mongoose
    .connect(`${DB}+${HOST}://${USER}:${PASSWORD}@${DIALECT}`)
    .then(() => console.log("Connected to database"))
    .catch((err) => console.error(err));
};
