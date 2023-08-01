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
      type: 'string',
      description: "업로드한 이미지 타입"
    },
    updatedAt: {
      type: "string",
      description: "수정 날짜",
    },
    createdAt: {
      type: "string",
      description: "생성 날짜",
    },
  },
};

export default medium;
