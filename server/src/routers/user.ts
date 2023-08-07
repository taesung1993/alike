import express from "express";
import { authMiddleware } from "@middlewares/auth.middleware";
import {
  deleteUser,
  getCreatedClasses,
  getIsDuplicateEmail,
  getJoinedClasses,
  getLikedClasses,
  getMe,
  sendVerificationEmail,
  signInCurrentUser,
  signUpNewUser,
  uploadAvatar,
  verifyEmail,
} from "@controllers/user";
import ROUTES from "@config/routes";
import VALIDATORS from "@config/validators";
import { SWAGGER_PATHS, swagger } from "@config/swagger";

const router = express.Router();

swagger.addPathAndOperation(SWAGGER_PATHS["SIGN_UP"]);
router.post(ROUTES.SIGN_UP, signUpNewUser);

swagger.addPathAndOperation(SWAGGER_PATHS["SIGN_IN"]);
router.post(ROUTES.SIGN_IN, signInCurrentUser);

swagger.addPathAndOperation(SWAGGER_PATHS["SEND_VERIFICATION_EMAIL"]);
router.post(
  ROUTES.SEND_VERIFICATION_EMAIL,
  VALIDATORS.SEND_VERIFICATION_EMAIL,
  sendVerificationEmail
);

swagger.addPathAndOperation(SWAGGER_PATHS["VERIFY_EMAIL"]);
router.post(ROUTES.VERIFY_EMAIL, VALIDATORS.VERIFY_EMAIL, verifyEmail);

swagger.addPathAndOperation(SWAGGER_PATHS["UPLOAD_AVATAR"]);
router.post(
  ROUTES.UPLOAD_AVATAR,
  authMiddleware,
  VALIDATORS.UPLOAD_AVATAR,
  uploadAvatar
);

swagger.addPathAndOperation(SWAGGER_PATHS["CHECK_DUPLICATE_EMAIL"]);
router.get(
  ROUTES.CHECK_DUPLICATE_EMAIL,
  VALIDATORS.CHECK_DUPLICATE_EMAIL,
  getIsDuplicateEmail
);

swagger.addPathAndOperation(SWAGGER_PATHS["GET_ME"]);
router.get(ROUTES.GET_ME, authMiddleware, getMe);

router.get(ROUTES.CREATED_CLASSES, authMiddleware, getCreatedClasses);
router.get(ROUTES.JOINED_CLASSES, authMiddleware, getJoinedClasses);
router.get(ROUTES.LIKED_CLASSES, authMiddleware, getLikedClasses);

swagger.addPathAndOperation(SWAGGER_PATHS["DELETE_USER"]);
router.delete(ROUTES.DELETE_USER, authMiddleware, deleteUser);

export default router;
