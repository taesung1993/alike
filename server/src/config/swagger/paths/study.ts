import { RESPONSE_CODE } from "@config/errors";

export const GET_CLASSES = {
  METHOD: "get",
  ROUTE: "/classes",
  OPERATION: {
    tags: ["Study"],
    summary: "스터디 리스트 불러오기",
    description: "생성했던 스터디를 리스트 형태로 불러옵니다.",
    security: [
      {
        Authorization: [],
      },
    ],
    responses: {
      [RESPONSE_CODE.OK]: {
        description: "스터디 리스트 불러오기 완료",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                $ref: "#/components/schemas/study",
              },
            },
          },
        },
      },
    },
  },
};
