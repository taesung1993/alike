import express from "express";
import { authMiddleware } from "@middlewares/auth.middleware";
import {
  deleteUser,
  getMe,
  signInCurrentUser,
  signUpNewUser,
  uploadAvatar,
} from "@controllers/user";
import { body } from "express-validator";

const router = express.Router();

router.post("/sign-up", signUpNewUser);
router.post("/sign-in", signInCurrentUser);
router.post(
  "/avatar",
  authMiddleware,
  [
    body("medium")
      .trim()
      .notEmpty()
      .withMessage("'medium'(body) is empty or missing"),
  ],
  uploadAvatar
);

router.get("/me", authMiddleware, getMe);

router.delete("/:id", authMiddleware, deleteUser);

export default router;
