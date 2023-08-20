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

swagger.addPathAndOperation(SWAGGER_PATHS["GET_CLASS"]);
router.get(ROUTES.GET_CLASS, getClass);

swagger.addPathAndOperation(SWAGGER_PATHS["CREATE_CLASS"]);
router.post(ROUTES.CREATE_CLASS, VALIDATORS.CREATE_CLASS, createClass);

swagger.addPathAndOperation(SWAGGER_PATHS["JOIN_CLASS"]);
router.post(ROUTES.JOIN_CLASS, joinClass);

swagger.addPathAndOperation(SWAGGER_PATHS["WITHDRAWAL_CLASS"]);
router.post(ROUTES.WITHDRAWAL_CLASS, withdrawalClass);

swagger.addPathAndOperation(SWAGGER_PATHS["LIKE_CLASS"]);
router.post(ROUTES.LIKE_CLASS, likeClass);

swagger.addPathAndOperation(SWAGGER_PATHS["CANCEL_LIKE_CLASS"]);
router.post(ROUTES.CANCEL_LIKE_CLASS, cancelToLikeClass);

swagger.addPathAndOperation(SWAGGER_PATHS["PATCH_CLASS"]);
router.patch(ROUTES.PATCH_CLASS, patchClass);

swagger.addPathAndOperation(SWAGGER_PATHS["DELETE_CLASS"]);
router.delete(ROUTES.DELETE_CLASS, deleteClass);

export default router;
