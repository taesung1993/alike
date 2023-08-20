import express from "express";
import {
  cancelToLikeStudy,
  createStudy,
  deleteStudy,
  getStudy,
  getStudies,
  joinStudy,
  likeStudy,
  patchStudy,
  withdrawalStudy,
} from "@controllers/studies";
import ROUTES from "@config/routes";
import VALIDATORS from "@config/validators";
import { authMiddleware } from "@middlewares/auth.middleware";
import { SWAGGER_PATHS, swagger } from "@config/swagger";

const router = express.Router();

router.use(authMiddleware);

swagger.addPathAndOperation(SWAGGER_PATHS["GET_STUDIES"]);
router.get(ROUTES.GET_STUDIES, getStudies);

swagger.addPathAndOperation(SWAGGER_PATHS["GET_STUDY"]);
router.get(ROUTES.GET_STUDY, getStudy);

swagger.addPathAndOperation(SWAGGER_PATHS["CREATE_STUDY"]);
router.post(ROUTES.CREATE_STUDY, VALIDATORS.CREATE_STUDY, createStudy);

swagger.addPathAndOperation(SWAGGER_PATHS["JOIN_STUDY"]);
router.post(ROUTES.JOIN_STUDY, joinStudy);

swagger.addPathAndOperation(SWAGGER_PATHS["WITHDRAWAL_STUDY"]);
router.post(ROUTES.WITHDRAWAL_STUDY, withdrawalStudy);

swagger.addPathAndOperation(SWAGGER_PATHS["LIKE_STUDY"]);
router.post(ROUTES.LIKE_STUDY, likeStudy);

swagger.addPathAndOperation(SWAGGER_PATHS["CANCEL_LIKE_STUDY"]);
router.post(ROUTES.CANCEL_LIKE_STUDY, cancelToLikeStudy);

swagger.addPathAndOperation(SWAGGER_PATHS["PATCH_STUDY"]);
router.patch(ROUTES.PATCH_STUDY, patchStudy);

swagger.addPathAndOperation(SWAGGER_PATHS["DELETE_STUDY"]);
router.delete(ROUTES.DELETE_STUDY, deleteStudy);

export default router;
