require("./config/server.config").connect();

const cors = require("cors");
const express = require("express");

const { STATUS, DEV_PORT, PROD_PORT } = process.env;
const PORT = STATUS == "production" ? PROD_PORT : DEV_PORT;

const app = express();

app.use(express.json(), cors(), express.urlencoded({ extended: true }));

require("./routes/auth.route")(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
