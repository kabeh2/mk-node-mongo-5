import { Router, Request, Response } from "express";
import User from "../db/models/User";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const user = new User(req.body);

  try {
    await user.save();

    res.status(201).send(user);
  } catch (error) {
    res.status(400).send({ error });
  }
});

router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await User.find({});

    if (!users) {
      res.status(400).send({ error: "No users found." });
    }

    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ error });
  }
});

export default router;
