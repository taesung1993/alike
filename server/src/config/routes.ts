const ROUTES = {
  GET_CATEGORIES: "/",
  GET_CATEGORY: "/:_id",
  CREATE_CATEGORY: "/",
  DELETE_CATEGORY: "/:_id",

  GET_CLASSES: "/",
  GET_CLASS: "/:_id",
  CREATE_CLASS: "/",
  PATCH_CLASS: "/:_id",
  DELETE_CLASS: "/:_id",
  JOIN_CLASS: "/:_id/join",
  WITHDRAWAL_CLASS: "/:_id/withdrawal",
  LIKE_CLASS: "/:_id/like",
  CANCEL_LIKE_CLASS: "/:_id/like/cancel",

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
};

export default ROUTES;
