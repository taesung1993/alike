import express from "express";
import { authMiddleware } from "@middlewares/auth.middleware";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
} from "@controllers/categories";

const router = express.Router();

// router.use(authMiddleware);
router.get("/", getCategories);
router.get("/:_id", getCategory);

router.post("/", createCategory);

router.delete("/:_id", deleteCategory);

export default router;
