import { Router } from "express";
import { addUser, readUser, loginUser } from "../controllers/index";
import authMiddleware from "../middleware/auth";

const router = Router();

router.post("/", addUser);

router.post("/login", loginUser);

router.get("/me", authMiddleware, readUser);

export default router;
