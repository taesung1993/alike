import express from "express";
import {
  createClass,
  deleteClass,
  getClass,
  getClasses,
  patchClass,
} from "@controllers/classes";
import { body } from "express-validator";

const router = express.Router();

// router.use(authMiddleware);

router.get("/", getClasses);
router.get("/:_id", getClass);

router.post(
  "/",
  [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("'name'(body) is empty or missing"),
    body("description")
      .trim()
      .notEmpty()
      .withMessage("'description'(body) is empty or missing"),
    body("location")
      .trim()
      .notEmpty()
      .withMessage("'location'(body) is empty or missing"),
    body("startDate")
      .trim()
      .notEmpty()
      .withMessage("'startDate'(body) is empty or missing"),
    body("status")
      .trim()
      .notEmpty()
      .withMessage("'status'(body) is empty or missing"),
    body("maximumPerson")
      .isNumeric()
      .withMessage("'maximumPerson'(body) is missing or not numeric"),
    body("category")
      .isNumeric()
      .withMessage("'category'(body) is missing or not numeric"),
    body("media").isArray().withMessage("'media'(body) must be an array"),
    body("media.*").isString().withMessage("each medium must be a string."),
  ],
  createClass
);

router.patch("/:_id", patchClass);

router.delete("/:_id", deleteClass);

export default router;
