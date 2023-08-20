const participant = {
  type: "object",
  properties: {
    id: {
      type: "string",
      description: "유저 아이디",
    },
    name: {
      type: "string",
      description: "유저 이름",
    },
    email: {
      type: "string",
      description: "유저 이메일",
    },
    createdAt: {
      type: "string",
      description: "생성 날짜",
    },
    updatedAt: {
      type: "string",
      description: "수정 날짜",
    },
    userType: {
      type: ["owner", "viewer"],
      description: "스터디 내 권한",
    },
    medium: {
      type: ["object", "null"],
      description: "유저 사진 아이디",
      $ref: "#/components/schemas/medium",
      default: null,
    },
  },
};

export default participant;
