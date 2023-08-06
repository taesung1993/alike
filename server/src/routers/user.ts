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
router.post(ROUTES.SIGN_IN, signInCurrentUser);

router.post(
  ROUTES.SEND_VERIFICATION_EMAIL,
  VALIDATORS.SEND_VERIFICATION_EMAIL,
  sendVerificationEmail
);
router.post(ROUTES.VERIFY_EMAIL, VALIDATORS.VERIFY_EMAIL, verifyEmail);

router.post(
  ROUTES.UPLOAD_AVATAR,
  authMiddleware,
  VALIDATORS.UPLOAD_AVATAR,
  uploadAvatar
);

router.get(
  ROUTES.CHECK_DUPLICATE_EMAIL,
  VALIDATORS.CHECK_DUPLICATE_EMAIL,
  getIsDuplicateEmail
);
router.get(ROUTES.GET_ME, authMiddleware, getMe);
router.get(ROUTES.CREATED_CLASSES, authMiddleware, getCreatedClasses);
router.get(ROUTES.JOINED_CLASSES, authMiddleware, getJoinedClasses);
router.get(ROUTES.LIKED_CLASSES, authMiddleware, getLikedClasses);

router.delete(ROUTES.DELETE_USER, authMiddleware, deleteUser);

export default router;
