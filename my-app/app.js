const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { mongoose } = require("mongoose");
require("dotenv").config({ path: "../.env" });

const port = process.env.NODE_DOCKER_PORT || 5000;
const postRouter = require("./routes/postRoutes");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");

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
app.use("/auth", authRouter);
app.use("/user", userRouter);

const aa = process.env.MONGO_USER;
mongoose
  .connect(
    "mongodb://root:password@localhost:20718/?authMechanism=DEFAULT"
  )
  .then((result) => {
    app.listen(process.env.NODE_DOCKER_PORT || 5000);
    console.log(`Server running on port: ${port}`);
  })
  .catch((err) => console.log(err));
