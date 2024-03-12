const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
const dbConfig = require("./config/db");
const cors = require("cors");
const PORT = process.env.PORT || 8000;
require("dotenv").config();
// Routes
const UserRoute = require("./routes/UserRoute");
const GroupRoute = require("./routes/GroupRoute");
const ExpenseRoute = require("./routes/ExpenseRoute");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/user", UserRoute);
app.use("/groups", GroupRoute);
app.use("/expense", ExpenseRoute);

mongoose
  .connect(dbConfig.url)
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `Database connecttion is succesful and an app is listening at the port ${PORT}`
      );
    });
  })
  .catch((error) => {
    console.log("Error thrown => " + error);
  });
