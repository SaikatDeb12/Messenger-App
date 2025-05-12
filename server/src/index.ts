import express from "express";
import authRouter from "./routes/auth.route";
const PORT = 9000;

const app = express();

app.get("/", (req, res) => {
  res.end("Hey there 2");
});

app.use("/api/auth", authRouter);

//http://localhost:8000/api/auth/register
//http://localhost:8000/api/auth/login

app.listen(PORT, () => console.log("Server started at", PORT));
