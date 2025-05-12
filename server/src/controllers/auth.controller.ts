import { Request, Response } from "express";

function handleLogin(req: Request, res: Response) {
  res.status(200).json({ msg: "Hey login" });
  return;
}

function handleRegister(req: Request, res: Response) {
  res.status(200).json({ msg: "Hey login" });
  return;
}

export { handleLogin, handleRegister };
