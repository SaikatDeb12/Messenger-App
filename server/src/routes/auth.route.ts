import express from "express";
import { Request, Response } from "express";
import { handleLogin, handleRegister } from "../controllers/auth.controller";
import passport from "passport";
import { IUser } from "../models/user.model";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", handleLogin);
router.post("/register", handleRegister);

router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/",
  }),
  (req: Request, res: Response) => {
    const user = req.user as IUser;
    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWTSECRET as string);
    res.redirect(`http://localhost:5173/callback?token=${token}`);
  }
);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    const user = req.user as IUser;
    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });
    res.redirect(`http://localhost:3000/callback?token=${token}`);
  }
);

export default router;
