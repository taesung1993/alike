import express from "express";
import { multipleMediaMulter } from "@middlewares/multer.middleware";
import {
  deleteMedia,
  getMedia,
  getMedium,
  uploadMedia,
} from "@controllers/media";

const router = express.Router();

// router.use(authMiddleware);

router.get("/", getMedia);

router.get("/:_id", getMedium);

router.post("/", multipleMediaMulter, uploadMedia);

router.delete("/:_id", deleteMedia);

export default router;
