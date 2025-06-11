import express, { json } from "express";
import authRouter from "./routes/auth.route";
import cors from "cors";
import * as dotenv from "dotenv";
import passport from "passport";
import session from "express-session";
import "./config/passport.config";
import connectDB from "./connect";
dotenv.config();
const PORT = 8000;

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(session({ secret: "secret", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

connectDB();

app.use("/api/auth", authRouter);

app.listen(PORT, () => console.log("Server started at", PORT));
