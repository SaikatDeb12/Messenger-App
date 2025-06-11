import { Request, Response } from "express";
import bcrypt from "bcrypt";
import UserModel from "../models/user.model";
import jwt from "jsonwebtoken";
async function handleLogin(req: Request, res: Response) {
  const body = await req.body;
  const { email, password } = body;
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
    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
}

async function handleRegister(req: Request, res: Response) {
  const body = await req.body;
  const { name, email, password } = body;

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
    res.json({ token });
    // res.status(200).json({ msg: "User created successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
}

export { handleLogin, handleRegister };
