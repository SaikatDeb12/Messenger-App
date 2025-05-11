const express = require("express");
const { connectMongoDB } = require("./connect");
const app = express();
const PORT = 8000;
require("dotenv").config();
const User = require("./models/model");

connectMongoDB(process.env.MONGODB_URL)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.log("Error: ", err));

app.listen(PORT, () => console.log(`server started at port: ${PORT}`));
