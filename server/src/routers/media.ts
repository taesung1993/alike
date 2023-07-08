import express from "express";
import { multipleMediaMulter } from "@middlewares/multer.middleware";
import {
  deleteMedia,
  getMedia,
  getMedium,
  uploadMedia,
} from "@controllers/media";
import ROUTES from "@config/routes";

const router = express.Router();

// router.use(authMiddleware);

router.get(ROUTES.GET_MEDIA, getMedia);
router.get(ROUTES.GET_MEDIUM, getMedium);

router.post(ROUTES.UPLOAD_MEDIA, multipleMediaMulter, uploadMedia);

router.delete(ROUTES.DELETE_MEDIUM, deleteMedia);

export default router;
