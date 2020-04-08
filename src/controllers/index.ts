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
    res.status(400).send({ error: "Error logging in." });
  }
};

export const logoutUser: (
  req: Request,
  res: Response
) => Promise<void | Response> = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send("User has been logged out.");
  } catch (error) {
    res.status(500).send();
  }
};

export const logoutAll: (
  req: Request,
  res: Response
) => Promise<void | Response> = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();

    res.send("All user sessions have been logged out.");
  } catch (error) {
    res.status(500).send();
  }
};

export const readUser: (
  req: Request,
  res: Response
) => Promise<void | Response> = async (req, res) => {
  res.send(req.user);
};

export const updateUser: (
  req: Request,
  res: Response
) => Promise<void | Response> = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["username", "email", "password"];
  const isValidUpdate = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidUpdate) {
    return res.status(400).send({ error: "Invalid Update." });
  }

  try {
    updates.forEach((update) => {
      req.user[update] = req.body[update];
    });
    await req.user.save();

    res.send(req.user);
  } catch (error) {
    res
      .status(500)
      .send({ error: "There was an error updating user on ther server." });
  }
};

export const deleteUser: (
  req: Request,
  res: Response
) => Promise<void | Response> = async (req, res) => {
  try {
    await req.user.remove();

    res.send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
};
