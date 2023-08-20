const ROUTES = {
  GET_CATEGORIES: "/",
  GET_CATEGORY: "/:_id",
  CREATE_CATEGORY: "/",
  DELETE_CATEGORY: "/:_id",

  GET_STUDIES: "/",
  GET_STUDY: "/:_id",
  CREATE_STUDY: "/",
  PATCH_STUDY: "/:_id",
  DELETE_STUDY: "/:_id",
  JOIN_STUDY: "/:_id/join",
  WITHDRAWAL_STUDY: "/:_id/withdrawal",
  LIKE_STUDY: "/:_id/like",
  CANCEL_LIKE_STUDY: "/:_id/like/cancel",

  GET_MEDIA: "/",
  GET_MEDIUM: "/:_id",
  UPLOAD_MEDIA: "/",
  DELETE_MEDIUM: "/:_id",

  SIGN_UP: "/sign-up",
  SIGN_IN: "/sign-in",
  UPLOAD_AVATAR: "/avatar",
  GET_ME: "/me",
  DELETE_USER: "/:_id",
  CHECK_DUPLICATE_EMAIL: "/check-duplicate-email",
  CREATED_CLASSES: "/created-classes",
  JOINED_CLASSES: "/joined-classes",
  LIKED_CLASSES: "/liked-classes",
  SEND_VERIFICATION_EMAIL: "/send/verification-email",
  VERIFY_EMAIL: "/verify/email",
};

export default ROUTES;
