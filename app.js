const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { mongoose } = require("mongoose");
require("dotenv").config({ path: "./config.env" });

const port = process.env.PORT || 5000;
const postRouter = require("./routes/postRoutes");

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

app.use("/post", postRouter);

mongoose
  .connect(process.env.ATLAS_URI)
  .then((result) => {
    app.listen(port);
    console.log(`Server running on port: ${port}`);
  })
  .catch((err) => console.log(err));