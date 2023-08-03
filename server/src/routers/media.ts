import express from "express";
import { multipleMediaMulter } from "@middlewares/multer.middleware";
import {
  deleteMedia,
  getMedia,
  getMedium,
  uploadMedia,
} from "@controllers/media";
import ROUTES from "@config/routes";
import { authMiddleware } from "@middlewares/auth.middleware";
import { SWAGGER_PATHS, swagger } from "@config/swagger";

const router = express.Router();

router.use(authMiddleware);

swagger.addPathAndOperation(SWAGGER_PATHS["GET_MEDIA"]);
router.get(ROUTES.GET_MEDIA, getMedia);

swagger.addPathAndOperation(SWAGGER_PATHS["GET_MEDIUM"]);
router.get(ROUTES.GET_MEDIUM, getMedium);

swagger.addPathAndOperation(SWAGGER_PATHS["UPLOAD_MEDIA"]);
router.post(ROUTES.UPLOAD_MEDIA, multipleMediaMulter, uploadMedia);

swagger.addPathAndOperation(SWAGGER_PATHS["DELETE_MEDIA"]);
router.delete(ROUTES.DELETE_MEDIUM, deleteMedia);

export default router;
