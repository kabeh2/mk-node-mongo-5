import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../db/models/User";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const tokenTemplate = <string>req.header("Authorization");
    const token = tokenTemplate.replace("Bearer ", "");

    const decoded = <any>(
      jwt.verify(token, `${process.env.MK_NODE_MONGO_SECRET}`)
    );

    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error("Unable to login.");
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send();
  }
};

export default authMiddleware;
