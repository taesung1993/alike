import {
  GET_CATEGORIES,
  GET_CATEGORY,
  CREATE_CATEGORY,
  DELETE_CATEGORY,
} from "./categories";

import { GET_MEDIA, GET_MEDIUM, UPLOAD_MEDIA, DELETE_MEDIA } from "./media";

import {
  SIGN_UP,
  SIGN_IN,
  SEND_VERIFICATION_EMAIL,
  VERIFY_EMAIL,
  UPLOAD_AVATAR,
  CHECK_DUPLICATE_EMAIL,
  GET_ME,
  DELETE_USER,
} from "./user";

import {
  GET_STUDIES,
  GET_STUDY,
  CREATE_STUDY,
  JOIN_STUDY,
  WITHDRAWAL_STUDY,
  LIKE_STUDY,
  CANCEL_LIKE_STUDY,
  PATCH_STUDY,
  DELETE_STUDY,
} from "./study";

export const PATHS = {
  GET_CATEGORIES,
  GET_CATEGORY,
  CREATE_CATEGORY,
  DELETE_CATEGORY,

  GET_MEDIA,
  GET_MEDIUM,
  UPLOAD_MEDIA,
  DELETE_MEDIA,

  SIGN_UP,
  SIGN_IN,
  SEND_VERIFICATION_EMAIL,
  VERIFY_EMAIL,
  UPLOAD_AVATAR,
  CHECK_DUPLICATE_EMAIL,
  GET_ME,
  DELETE_USER,

  GET_STUDIES,
  GET_STUDY,
  CREATE_STUDY,
  JOIN_STUDY,
  WITHDRAWAL_STUDY,
  LIKE_STUDY,
  CANCEL_LIKE_STUDY,
  PATCH_STUDY,
  DELETE_STUDY,
};
