import { body, query } from "express-validator";

const VALIDATORS = {
  CREATE_CATEGORY: [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("'name'(body) is empty or missing"),
  ],

  CREATE_CLASS: [
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

  UPLOAD_AVATAR: [
    body("medium")
      .trim()
      .notEmpty()
      .withMessage("'medium'(body) is empty or missing"),
  ],

  CHECK_DUPLICATE_EMAIL: [
    query("email")
      .trim()
      .notEmpty()
      .withMessage("'email'(query) is empty or missing"),
  ],
};

export default VALIDATORS;
