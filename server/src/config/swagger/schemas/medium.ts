const medium = {
  type: "object",
  properties: {
    id: {
      type: "string",
      description: "미디어 아이디",
    },
    url: {
      type: "string",
      description: "미디어 주소",
    },
    name: {
      type: "string",
      description: "업로드한 이미지 이름",
    },
    type: {
      type: "string",
      description: "업로드한 이미지 타입",
    },
    updatedAt: {
      type: "string",
      description: "수정 날짜",
    },
    createdAt: {
      type: "string",
      description: "생성 날짜",
    },
    application: {
      type: "string",
      nullable: true,
      description: "연결되어 있는 어플리케이션 아이디",
    },
    model: {
      type: "string",
      nullable: true,
      description: "연결되어 있는 어플리케이션 타입",
    },
  },
};

export default medium;
