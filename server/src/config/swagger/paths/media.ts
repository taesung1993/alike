import { RESPONSE_CODE } from "@config/errors";

export const GET_MEDIA = {
  METHOD: "get",
  ROUTE: "/media",
  OPERATION: {
    tags: ["Media"],
    summary: "사진 리스트 불러오기",
    description: "생성했던 사진을 리스트 형태로 불러옵니다.",
    security: [
      {
        Authorization: [],
      },
    ],
    responses: {
      [RESPONSE_CODE.OK]: {
        description: "사진 리스트 불러오기 완료",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                $ref: "#/components/schemas/medium",
              },
            },
          },
        },
      },
    },
  },
};

export const GET_MEDIUM = {
  METHOD: "get",
  ROUTE: "/media/{_id}",
  OPERATION: {
    tags: ["Media"],
    summary: "사진 불러오기",
    description: "생성했던 사진을 불러옵니다.",
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
        description: "사진 아이디",
      },
    ],
    responses: {
      [RESPONSE_CODE.OK]: {
        description: "사진 불러오기 완료",
        content: {
          "application/json": {
            schema: {
              type: "object",
              $ref: "#/components/schemas/medium",
            },
          },
        },
      },
    },
  },
};

export const UPLOAD_MEDIA = {
  METHOD: "post",
  ROUTE: "/media",
  OPERATION: {
    tags: ["Media"],
    summary: "사진을 업로드",
    description: "사진을 새로 업로드합니다.",
    security: [
      {
        Authorization: [],
      },
    ],
    requestBody: {
      required: true,
      content: {
        "multipart/form-data": {
          schema: {
            type: "object",
            required: ["files"],
            properties: {
              files: {
                type: "array",
                items: {
                  type: "string",
                  format: "binary",
                },
              },
            },
          },
        },
      },
    },
    responses: {
      [RESPONSE_CODE.OK]: {
        description: "업로드 완료",
        content: {
          "application/json": {
            schema: {
              type: "array",
              items: {
                $ref: "#/components/schemas/medium",
              },
            },
          },
        },
      },
    },
  },
};

export const DELETE_MEDIA = {
  METHOD: "delete",
  ROUTE: "/media/{_id}",
  OPERATION: {
    tags: ["Media"],
    summary: "사진 삭제",
    description: "업로드한 사진을 삭제합니다.",
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
        description: "사진 아이디",
      },
    ],
    responses: {
      [RESPONSE_CODE.OK]: {
        description: "삭제 완료",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                message: {
                  type: "string",
                  description: "삭제 성공 여부",
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
