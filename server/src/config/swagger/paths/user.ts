import { RESPONSE_CODE } from "@config/errors";

export const SIGN_UP = {
  METHOD: "post",
  ROUTE: "/user/sign-up",
  OPERATION: {
    tags: ["User"],
    summary: "회원가입",
    description: "회원가입을 진행합니다.",
    security: [
      {
        Authorization: [],
      },
    ],
    responses: {
      [RESPONSE_CODE.OK]: {
        description: "회원가입 완료",
        content: {
          "application/json": {
            schema: {
              type: "object",
              $ref: "#/components/schemas/token",
            },
          },
        },
      },
    },
  },
};
