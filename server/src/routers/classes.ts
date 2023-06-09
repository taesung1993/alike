import express from "express";
import {
  createClass,
  deleteClass,
  getClass,
  getClasses,
  joinClass,
  patchClass,
} from "@controllers/classes";
import ROUTES from "@config/routes";
import VALIDATORS from "@config/validators";
import { authMiddleware } from "@middlewares/auth.middleware";

const router = express.Router();

router.use(authMiddleware);

router.get(ROUTES.GET_CLASSES, getClasses);
router.get(ROUTES.GET_CLASS, getClass);

router.post(ROUTES.CREATE_CLASS, VALIDATORS.CREATE_CLASS, createClass);
router.post(ROUTES.JOIN_CLASS, joinClass);

router.patch(ROUTES.PATCH_CLASS, patchClass);

router.delete(ROUTES.DELETE_CLASS, deleteClass);

export default router;
