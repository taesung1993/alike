import express from "express";
import { authMiddleware } from "@middlewares/auth.middleware";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
} from "@controllers/categories";
import { body } from "express-validator";

const router = express.Router();

// router.use(authMiddleware);
router.get("/", getCategories);
router.get("/:_id", getCategory);

router.post(
  "/",
  [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("'name'(body) is empty or missing"),
  ],
  createCategory
);

router.delete("/:_id", deleteCategory);

export default router;
