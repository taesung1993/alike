import express from "express";
import { authMiddleware } from "@middlewares/auth.middleware";
import {
  deleteUser,
  getIsDuplicateEmail,
  getMe,
  signInCurrentUser,
  signUpNewUser,
  uploadAvatar,
} from "@controllers/user";
import ROUTES from "@config/routes";
import VALIDATORS from "@config/validators";

const router = express.Router();

router.post(ROUTES.SIGN_UP, signUpNewUser);
router.post(ROUTES.SIGN_IN, signInCurrentUser);
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

router.delete(ROUTES.DELETE_USER, authMiddleware, deleteUser);

export default router;
