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

export const SEND_VERIFICATION_EMAIL = {
  METHOD: "post",
  ROUTE: "/user/send/verification-email",
  OPERATION: {
    tags: ["User"],
    summary: "이메일 인증코드 요청",
    description: "해당 이메일로 인증 코드를 요청합니다.",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            required: ["email"],
            properties: {
              email: {
                type: "string",
                description: "이메일",
                example: "cheonyulin@gmail.com",
              },
            },
          },
        },
      },
    },
    responses: {
      [RESPONSE_CODE.OK]: {
        description: "인증코드 요청 완료",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                success: {
                  type: "boolean",
                  example: true,
                },
              },
            },
          },
        },
      },
    },
  },
};

export const VERIFY_EMAIL = {
  METHOD: "post",
  ROUTE: "/user/verify/email",
  OPERATION: {
    tags: ["User"],
    summary: "이메일 인증코드 유효성 검사",
    description: "이메일과 인증코드의 유효성을 검사합니다.",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            required: ["email", "code"],
            properties: {
              email: {
                type: "string",
                description: "이메일",
                example: "cheonyulin@gmail.com",
              },
              code: {
                type: "string",
                description: "인증 코드",
                example: "123456",
              },
            },
          },
        },
      },
    },
    responses: {
      [RESPONSE_CODE.OK]: {
        description: "인증코드 검사 완료",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                success: {
                  type: "boolean",
                  example: true,
                },
              },
            },
          },
        },
      },
    },
  },
};

export const UPLOAD_AVATAR = {
  METHOD: "post",
  ROUTE: "/user/avatar",
  OPERATION: {
    tags: ["User"],
    summary: "아바타 등록",
    description: "해당 유저의 아바타를 등록합니다.",
    security: [
      {
        Authorization: [],
      },
    ],
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            required: ["medium"],
            properties: {
              medium: {
                type: "string",
                description: "사진 아이디",
              },
            },
          },
        },
      },
    },
    responses: {
      [RESPONSE_CODE.OK]: {
        description: "아바타 등록 완료",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  example: "success",
                },
              },
            },
          },
        },
      },
    },
  },
};

export const CHECK_DUPLICATE_EMAIL = {
  METHOD: "get",
  ROUTE: "/user/check-duplicate-email",
  OPERATION: {
    tags: ["User"],
    summary: "이메일 중복 검사",
    description: "이메일의 가입 여부를 확인합니다.",
    parameters: [
      {
        in: "query",
        type: "string",
        required: true,
        name: "email",
        description: "이메일",
        example: "mason@veluga.io",
      },
    ],
    responses: {
      [RESPONSE_CODE.OK]: {
        description: "이메일 중복 검사 완료",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                isDuplicate: {
                  type: "boolean",
                  example: true,
                },
              },
            },
          },
        },
      },
    },
  },
};

export const GET_ME = {
  METHOD: "get",
  ROUTE: "/user/me",
  OPERATION: {
    tags: ["User"],
    summary: "내 정보 불러오기",
    description: "내 정보를 불러옵니다.",
    security: [
      {
        Authorization: [],
      },
    ],
    responses: {
      [RESPONSE_CODE.OK]: {
        description: "내 정보 불러오기 완료",
        content: {
          "application/json": {
            schema: {
              type: "object",
              $ref: "#/components/schemas/user",
            },
          },
        },
      },
    },
  },
};

export const DELETE_USER = {
  METHOD: "delete",
  ROUTE: "/user/{_id}",
  OPERATION: {
    tags: ["User"],
    summary: "유저 탈퇴",
    description: "탈퇴 요청을 보냅니다.",
    security: [
      {
        Authorization: [],
      },
    ],
    parameters: [
      {
        in: "path",
        type: "string",
        required: true,
        name: "_id",
        description: "유저 아이디",
      },
    ],
    responses: {
      [RESPONSE_CODE.OK]: {
        description: "탈퇴 완료",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  example: "success",
                },
              },
            },
          },
        },
      },
    },
  },
};
