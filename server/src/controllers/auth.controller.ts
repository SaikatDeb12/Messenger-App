import { Request, Response } from "express";
import bcrypt from "bcrypt";
import UserModel from "../models/user.model";
import jwt from "jsonwebtoken";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid Email"),
  password: z
    .string()
    .min(4)
    .max(20, "Password should contain atleast 4 characters "),
});

async function handleLogin(req: Request, res: Response) {
  const { success, data, error } = loginSchema.safeParse(req.body);
  if (!success) {
    res.status(401).json({ msg: error.errors[0].message });
    return;
  }

  const { email, password } = data;
  try {
    const user = await UserModel.findOne({ email });
    if (!user || !user.hashedPassword) {
      res.status(400).json({ msg: "Invalid credentials" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.hashedPassword);
    if (!isMatch) res.status(400).json({ msg: "Invalid credentials" });

    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string);
    res.status(200).json({ token: token });
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error" });
  }
}

const registerSchema = z.object({
  name: z.string().min(1, "Required"),
  email: z.string().email("Invalid Email"),
  password: z
    .string()
    .min(4)
    .max(20, "Password should contain atleast 4 chracters"),
});

async function handleRegister(req: Request, res: Response) {
  const { success, data, error } = registerSchema.safeParse(req.body);
  if (!success) {
    res.status(401).json({ msg: error.errors[0].message });
    return;
  }

  const { name, email, password } = data;
  try {
    let user = await UserModel.findOne({ email });
    if (user) {
      res.status(400).json({ msg: "User already exists" });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    user = await UserModel.create({
      name: name,
      email: email,
      hashedPassword: hashedPassword,
    });

    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET as string);
    res.status(200).json({ token: token });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
}

const getProfile = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.user).select("-password");
    if (!user) {
      res.status(404).json({ msg: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (err) {
    console.log("Error fething profile!", err);
    res.status(500).json({ msg: "Server error" });
  }
};

export { handleLogin, handleRegister, getProfile };
