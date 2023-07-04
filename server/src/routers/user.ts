import express from "express";
import { authMiddleware } from "@middlewares/auth.middleware";
import {
  deleteUser,
  getMe,
  signInCurrentUser,
  signUpNewUser,
} from "@controllers/user";

const router = express.Router();

router.post("/sign-up", signUpNewUser);
router.post("/sign-in", signInCurrentUser);

router.get("/me", authMiddleware, getMe);

router.delete("/:id", authMiddleware, deleteUser);

export default router;
