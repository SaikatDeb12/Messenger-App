const express = require("express");
const { connectMongoDB } = require("./connect");
const app = express();
const PORT = 8000;
require("dotenv").config();

connectMongoDB(process.env.MONGODB_URL);

app.listen(PORT, () => console.log(`server started at port: ${PORT}`));
