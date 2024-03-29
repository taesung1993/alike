import { RESPONSE_CODE } from "@config/errors";

export const GET_CATEGORIES = {
  METHOD: "get",
  ROUTE: "/categories",
  OPERATION: {
    tags: ["Category"],
    summary: "카테고리 리스트 불러오기",
    description: "생성했던 카테고리를 리스트 형태로 불러옵니다.",
    security: [
      {
        Authorization: [],
      },
    ],
    responses: {
      [RESPONSE_CODE.OK]: {
        description: "카테고리 리스트 불러오기 완료",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                $ref: "#/components/schemas/category",
              },
            },
          },
        },
      },
    },
  },
};

export const GET_CATEGORY = {
  METHOD: "get",
  ROUTE: "/categories/{_id}",
  OPERATION: {
    tags: ["Category"],
    summary: "카테고리 불러오기",
    description: "생성했던 카테고리를 불러옵니다.",
    security: [
      {
        Authorization: [],
      },
    ],
    parameters: [
      {
        in: "path",
        type: "number",
        required: true,
        name: "_id",
        description: "카테고리 아이디",
      },
    ],
    responses: {
      [RESPONSE_CODE.OK]: {
        description: "카테고리 불러오기 완료",
        content: {
          "application/json": {
            schema: {
              type: "object",
              $ref: "#/components/schemas/category",
            },
          },
        },
      },

      [RESPONSE_CODE.NOT_FOUND]: {
        description: "카테고리가 존재하지 않음",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  example: "Not category",
                },
              },
            },
          },
        },
      },
    },
  },
};

export const CREATE_CATEGORY = {
  METHOD: "post",
  ROUTE: "/categories",
  OPERATION: {
    tags: ["Category"],
    summary: "카테고리 생성하기",
    description: "새로운 카테고리를 생성합니다.",
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
            required: ["name"],
            properties: {
              name: {
                type: "string",
                description: "카테고리 이름",
                example: "Next.js",
              },
            },
          },
        },
      },
    },
    responses: {
      [RESPONSE_CODE.OK]: {
        description: "카테고리 생성 완료",
        content: {
          "application/json": {
            schema: {
              type: "object",
              $ref: "#/components/schemas/category",
            },
          },
        },
      },
    },
  },
};

export const DELETE_CATEGORY = {
  METHOD: "delete",
  ROUTE: "/categories/{_id}",
  OPERATION: {
    tags: ["Category"],
    summary: "카테고리 삭제",
    description: "생성했던 카테고리를 삭제합니다.",
    security: [
      {
        Authorization: [],
      },
    ],
    parameters: [
      {
        in: "path",
        type: "number",
        required: true,
        name: "_id",
        description: "카테고리 아이디",
      },
    ],
    responses: {
      [RESPONSE_CODE.OK]: {
        description: "카테고리 삭제 완료",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                success: {
                  type: "boolean",
                  description: "요청 성공 여부",
                },
              },
            },
          },
        },
      },

      [RESPONSE_CODE.NOT_FOUND]: {
        description: "카테고리가 존재하지 않음",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  example: "Not category",
                },
              },
            },
          },
        },
      },
    },
  },
};
