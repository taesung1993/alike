import { RESPONSE_CODE } from "@config/errors";

export const SIGN_UP = {
  METHOD: "post",
  ROUTE: "/user/sign-up",
  OPERATION: {
    tags: ["User"],
    summary: "회원가입",
    description: "회원가입을 진행합니다.",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            required: ["name", "email", "password"],
            properties: {
              name: {
                type: "string",
                description: "유저 이름",
                example: "alike",
              },
              email: {
                type: "string",
                description: "유저 이메일",
                example: "test@alike.com",
              },
              password: {
                type: "string",
                description: "유저 비밀번호",
                example: "string",
              },
            },
          },
        },
      },
    },
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

export const SIGN_IN = {
  METHOD: "post",
  ROUTE: "/user/sign-in",
  OPERATION: {
    tags: ["User"],
    summary: "로그인",
    description: "로그인을 진행합니다.",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            required: ["email", "password"],
            properties: {
              email: {
                type: "string",
                description: "이메일",
                example: "mason@veluga.io",
              },
              password: {
                type: "string",
                description: "비밀번호",
                example: "123123as",
              },
            },
          },
        },
      },
    },
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
