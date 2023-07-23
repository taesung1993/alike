const category = {
  type: "object",
  properties: {
    id: {
      type: "integer",
      description: "카테고리 아이디",
    },
    name: {
      type: "string",
      description: "카테고리 이름",
    },
    createdAt: {
      type: "string",
      description: "생성 날짜",
    },
    updatedAt: {
      type: "string",
      description: "수정 날짜",
    },
    classCount: {
      type: "integer",
      description: "카테고리에 소속된 클래스 개수",
    },
  },
};

export default category;
