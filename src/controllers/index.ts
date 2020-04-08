import { Request, Response } from "express";
import User from "../db/models/User";

export const addUser: (
  req: Request,
  res: Response
) => Promise<void | Response> = async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();

    const token = await user.generateAuthToken();

    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send({ error });
  }
};

export const loginUser: (
  req: Request,
  res: Response
) => Promise<void | Response> = async (req, res) => {
  try {
    // find user via email or username and compare passwords
    // via statics method
    const user = await User.findByCredentials(
      req.body.password,
      req.body.username || undefined,
      req.body.email || undefined
    );

    // generate token
    const token = await user.generateAuthToken();

    // send user
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send({ error: "Error here..." });
  }
};

export const readUser: (
  req: Request,
  res: Response
) => Promise<void | Response> = async (req, res) => {
  res.send(req.user);
};
