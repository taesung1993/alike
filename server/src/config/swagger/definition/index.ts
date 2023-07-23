import { category } from "../schemas";

const definition = {
  openapi: "3.1.0",
  info: {
    title: "Alike ApI with swagger",
    version: "0.1.0",
    description: "Alike API Document",
  },
  servers: [
    {
      url: "http://localhost:5000",
      description: "로컬 서버",
    },
  ],
  swaggerSchemes: ["http", "https"],
  securityDefinitions: {
    ApiKeyAuth: {
      type: "apiKey",
      name: "Authorization",
      in: "header",
    },
  },

  produces: ["application/json"],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "Token",
        name: "Authorization",
        description: "인증 토큰 값을 넣어주세요.",
        in: "header",
      },
    },
    schemas: {
      category,
    },
  },

  tags: [
    {
      name: "Category",
      description: "카테고리 API",
    },
  ],

  paths: {},
};

export default definition;
