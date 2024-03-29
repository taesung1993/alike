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

swagger.addPathAndOperation(SWAGGER_PATHS["GET_CATEGORY"]);
router.get(ROUTES.GET_CATEGORY, getCategory);

swagger.addPathAndOperation(SWAGGER_PATHS["CREATE_CATEGORY"]);
router.post(ROUTES.CREATE_CATEGORY, VALIDATORS.CREATE_CATEGORY, createCategory);

swagger.addPathAndOperation(SWAGGER_PATHS["DELETE_CATEGORY"]);
router.delete(ROUTES.DELETE_CATEGORY, deleteCategory);

export default router;
