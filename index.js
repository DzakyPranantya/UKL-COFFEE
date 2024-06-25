const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoute = require("./routes/auth.route");
const coffeeRoute = require("./routes/coffee.route");
const orderRoute = require("./routes/order.route");
const port = 3300;

const app = express();

app.use(cors());

app.use("/login", authRoute);
app.use("/coffee", coffeeRoute);
app.use("/order", orderRoute);
app.use(express.static(path.join(__dirname, "image")));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
