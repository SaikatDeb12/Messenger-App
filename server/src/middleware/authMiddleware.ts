import { Request, Response } from "express";
import UserModel from "../models/user.model";

export interface AuthRequest extends Request {
  user?: string;
}

export const getProfile = async (req: Request, res: Response) => {
  try {
    const user = await UserModel.findById(req.user).select("-password");
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.log("Error fething profile!", err);
    res.status(500).json({ msg: "Server error" });
  }
};
