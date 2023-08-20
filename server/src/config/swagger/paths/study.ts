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

export const GET_CLASS = {
  METHOD: "get",
  ROUTE: "/classes/{_id}",
  OPERATION: {
    tags: ["Study"],
    summary: "스터디 불러오기",
    description: "생성했던 스터디를 불러옵니다.",
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
        description: "스터디 아이디",
      },
    ],
    responses: {
      [RESPONSE_CODE.OK]: {
        description: "스터디 불러오기 완료",
        content: {
          "application/json": {
            schema: {
              type: "object",
              $ref: "#/components/schemas/study",
            },
          },
        },
      },
    },
  },
};

export const CREATE_CLASS = {
  METHOD: "post",
  ROUTE: "/classes",
  OPERATION: {
    tags: ["Study"],
    summary: "스터디 생성하기",
    description: "새로운 스터디를 생성합니다.",
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
            required: [
              "name",
              "description",
              "location",
              "startDate",
              "status",
              "maximumPerson",
              "category",
              "media",
            ],
            properties: {
              name: {
                type: "string",
                description: "스터디 이름",
                example: "리액트 스터디",
              },
              description: {
                type: "string",
                description: "스터디 설명",
                example: "리액트 스터디 입문자들을 위한 스터디",
              },
              location: {
                type: "string",
                description: "스터디 장소",
                example: "서울",
              },
              startDate: {
                type: "string",
                description: "스터디 시작 날짜",
                example: "2023-05-25T08:07:08.679Z",
              },
              status: {
                type: "string",
                description: "상태",
                example: "상태",
              },
              maximumPerson: {
                type: "integer",
                description: "참여 가능한 최대 인원",
                example: 4,
              },
              category: {
                type: "integer",
                description: "카테고리 아이디",
                example: 1,
              },
              media: {
                type: "array",
                description: "클래스 사진",
                items: {
                  type: "string",
                },
                example: [],
              },
            },
          },
        },
      },
    },
    responses: {
      [RESPONSE_CODE.OK]: {
        description: "스터디 생성 완료",
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

export const JOIN_CLASS = {
  METHOD: "post",
  ROUTE: "/classes/{_id}/join",
  OPERATION: {
    tags: ["Study"],
    summary: "스터디 가입하기",
    description: "스터디에 가입합니다.",
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
        description: "스터디 아이디",
      },
    ],
    responses: {
      [RESPONSE_CODE.OK]: {
        description: "스터디 가입 완료",
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

export const WITHDRAWAL_CLASS = {
  METHOD: "post",
  ROUTE: "/classes/{_id}/withdrawal",
  OPERATION: {
    tags: ["Study"],
    summary: "스터디 탈퇴하기",
    description: "가입했던 스터디에서 탈퇴합니다",
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
        description: "스터디 아이디",
      },
    ],
    responses: {
      [RESPONSE_CODE.OK]: {
        description: "스터디 탈퇴 완료",
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

export const LIKE_CLASS = {
  METHOD: "post",
  ROUTE: "/classes/{_id}/like",
  OPERATION: {
    tags: ["Study"],
    summary: "스터디 즐겨찾기",
    description: "관심있는 스터디를 즐겨찾기에 추가합니다.",
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
        description: "스터디 아이디",
      },
    ],
    responses: {
      [RESPONSE_CODE.OK]: {
        description: "해당 스터디 즐겨찾기에 추가 완료",
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

export const CANCEL_LIKE_CLASS = {
  METHOD: "post",
  ROUTE: "/classes/{_id}/like/cancel",
  OPERATION: {
    tags: ["Study"],
    summary: "스터디 즐겨찾기 취소",
    description: "해당 스터디를 즐겨찾기 목록에서 삭제합니다.",
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
        description: "스터디 아이디",
      },
    ],
    responses: {
      [RESPONSE_CODE.OK]: {
        description: "해당 스터디를 즐겨찾기에서 삭제 완료",
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

export const PATCH_CLASS = {
  METHOD: "patch",
  ROUTE: "/classes/{_id}",
  OPERATION: {
    tags: ["Study"],
    summary: "스터디 정보 수정",
    description: "해당 스터디의 정보를 수정합니다.",
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
        description: "스터디 아이디",
      },
    ],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            properties: {
              name: {
                type: "string",
                description: "스터디 이름",
                example: "리액트 스터디",
              },
              description: {
                type: "string",
                description: "스터디 설명",
                example: "리액트 스터디 입문자들을 위한 스터디",
              },
              location: {
                type: "string",
                description: "스터디 장소",
                example: "서울",
              },
              startDate: {
                type: "string",
                description: "스터디 시작 날짜",
                example: "2023-05-25T08:07:08.679Z",
              },
              status: {
                type: "string",
                description: "상태",
                example: "상태",
              },
              maximumPerson: {
                type: "integer",
                description: "참여 가능한 최대 인원",
                example: 4,
              },
              category: {
                type: "integer",
                description: "카테고리 아이디",
                example: 1,
              },
              media: {
                type: "array",
                description: "클래스 사진",
                items: {
                  type: "string",
                },
                example: [],
              },
            },
          },
        },
      },
    },
    responses: {
      [RESPONSE_CODE.OK]: {
        description: "해당 스터디의 정보를 수정 완료",
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

export const DELETE_CLASS = {
  METHOD: "delete",
  ROUTE: "/classes/{_id}",
  OPERATION: {
    tags: ["Study"],
    summary: "스터디 삭제",
    description: "해당 스터디를 삭제합니다",
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
        description: "스터디 아이디",
      },
    ],
    responses: {
      [RESPONSE_CODE.OK]: {
        description: "스터디 삭제 완료",
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
