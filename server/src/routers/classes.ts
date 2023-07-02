import express from "express";
import {
  createClass,
  deleteClass,
  getClass,
  getClasses,
  patchClass,
} from "@controllers/classes";

const router = express.Router();

// router.use(authMiddleware);

router.get("/", getClasses);
router.get("/:_id", getClass);

router.post("/", createClass);

router.patch("/:_id", patchClass);

router.delete("/:_id", deleteClass);

export default router;
