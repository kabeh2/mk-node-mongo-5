import { Router } from "express";
import {
  addUser,
  readUser,
  loginUser,
  logoutUser,
  logoutAll,
  updateUser,
  deleteUser,
} from "../controllers";
import authMiddleware from "../middleware/auth";

const router = Router();

router.post("/", addUser);

router.post("/login", loginUser);

router.post("/logout", authMiddleware, logoutUser);

router.post("/logoutAll", authMiddleware, logoutAll);

router.get("/me", authMiddleware, readUser);

router.patch("/me", authMiddleware, updateUser);

router.delete("/me", authMiddleware, deleteUser);

export default router;
