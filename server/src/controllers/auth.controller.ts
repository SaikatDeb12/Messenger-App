import { Request, Response } from "express";
import bcrypt from "bcrypt";
import UserModel from "../models/user.model";
function handleLogin(req: Request, res: Response) {
  res.status(200).json({ msg: "User logged in" });
  return;
}

async function handleRegister(req: Request, res: Response) {
  const body = await req.body;
  const { name, email, password } = body;

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

  res.status(200).json({ msg: "User created successfully" });
  return;
}

export { handleLogin, handleRegister };
