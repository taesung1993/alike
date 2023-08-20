import express from "express";
import {
  cancelToLikeClass,
  createClass,
  deleteClass,
  getClass,
  getClasses,
  joinClass,
  likeClass,
  patchClass,
  withdrawalClass,
} from "@controllers/classes";
import ROUTES from "@config/routes";
import VALIDATORS from "@config/validators";
import { authMiddleware } from "@middlewares/auth.middleware";
import { SWAGGER_PATHS, swagger } from "@config/swagger";

const router = express.Router();

router.use(authMiddleware);

swagger.addPathAndOperation(SWAGGER_PATHS["GET_CLASSES"]);
router.get(ROUTES.GET_CLASSES, getClasses);
router.get(ROUTES.GET_CLASS, getClass);

router.post(ROUTES.CREATE_CLASS, VALIDATORS.CREATE_CLASS, createClass);
router.post(ROUTES.JOIN_CLASS, joinClass);
router.post(ROUTES.WITHDRAWAL_CLASS, withdrawalClass);
router.post(ROUTES.LIKE_CLASS, likeClass);
router.post(ROUTES.CANCEL_LIKE_CLASS, cancelToLikeClass);

router.patch(ROUTES.PATCH_CLASS, patchClass);

router.delete(ROUTES.DELETE_CLASS, deleteClass);

export default router;
