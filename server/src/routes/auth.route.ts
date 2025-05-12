import express from "express";
import { handleLogin, handleRegister } from "../controllers/auth.controller";

const router = express.Router();

router.post("/login", handleLogin).post("/register", handleRegister);

export default router;
