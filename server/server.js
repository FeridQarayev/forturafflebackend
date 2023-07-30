require("./config/server.config").connect();

const cors = require("cors");
const express = require("express");

const { STATUS, DEV_PORT, PROD_PORT } = process.env;
const PORT = (STATUS == "production" ? PROD_PORT : DEV_PORT) || 8080;

const app = express();

app.use(express.json(), cors(), express.urlencoded({ extended: true }));

require("./routes/auth.route")(app);
require("./routes/user.route")(app);
require("./routes/category.route")(app);
require("./routes/product.route")(app);
require("./routes/contact.route")(app);
require("./routes/feedback.route")(app);
require("./routes/subscribed.route")(app);
require("./routes/mail.route")(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
