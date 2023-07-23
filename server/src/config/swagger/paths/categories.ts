import { RESPONSE_CODE } from "@config/errors";

export const GET_CATEGORIES = {
  METHOD: "get",
  ROUTE: "/categories",
  OPERATION: {
    tags: ["Category"],
    summary: "카테고리 리스트 불러오기",
    description: "생성했던 카테고리를 리스트 형태로 불러옵니다.",
    responses: {
      [RESPONSE_CODE.OK]: {
        description: "카티고리 리스트 불러오기 완료",
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
