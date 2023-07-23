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
    },
  },
};
