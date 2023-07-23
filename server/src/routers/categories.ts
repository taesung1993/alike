import express from "express";
import { authMiddleware } from "@middlewares/auth.middleware";
import {
  createCategory,
  deleteCategory,
  getCategories,
  getCategory,
} from "@controllers/categories";
import ROUTES from "@config/routes";
import VALIDATORS from "@config/validators";
import { SWAGGER_PATHS, swagger } from "@config/swagger";

const router = express.Router();

router.use(authMiddleware);

swagger.addPathAndOperation(SWAGGER_PATHS["GET_CATEGORIES"]);
router.get(ROUTES.GET_CATEGORIES, getCategories);
router.get(ROUTES.GET_CATEGORY, getCategory);

router.post(ROUTES.CREATE_CATEGORY, VALIDATORS.CREATE_CATEGORY, createCategory);

router.delete(ROUTES.DELETE_CATEGORY, deleteCategory);

export default router;
