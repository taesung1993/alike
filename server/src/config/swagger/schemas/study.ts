const study = {
  type: "object",
  properties: {
    id: {
      type: "string",
      description: "클래스 아이디",
    },
    name: {
      type: "string",
      description: "클래스 이름",
    },
    description: {
      type: "string",
      description: "클래스 설명",
    },
    location: {
      type: "string",
      description: "위치",
    },
    startDate: {
      type: "string",
      description: "시작 날짜",
    },
    status: {
      type: "string",
      description: "상태",
    },
    maximumPerson: {
      type: "integer",
      description: "최대 참여 인원",
    },
    category: {
      type: "integer",
      description: "카테고리",
    },
    createdAt: {
      type: "string",
      description: "생성 날짜",
    },
    updatedAt: {
      type: "string",
      description: "수정 날짜",
    },
    creator: {
      type: "string",
      description: "스터디를 생성한 유저",
    },
    media: {
      type: "array",
      description: "스터디에 사용한 사진",
      items: {
        $ref: "#/components/schemas/medium",
      },
    },
    participants: {
      type: "array",
      description: "스터디 멤버들",
      items: {
        $ref: "#/components/schemas/participant",
      },
    },
  },
};

export default study;
