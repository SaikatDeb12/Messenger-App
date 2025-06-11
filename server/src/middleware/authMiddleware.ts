import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

interface jwtPayload {
  userId: string;
}

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer", "").trim();

  if (!token) {
    res.status(401).json({ msg: "Authorization denied!" });
  }

  try {
    const decode = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;
    req.user = decode.userId;
    next();
  } catch (err) {
    console.log("JWT verify error");
    res.status(401).json({ msg: "Token is invalid" });
  }
};

export default authMiddleware;
