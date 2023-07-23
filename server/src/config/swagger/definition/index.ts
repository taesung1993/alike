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
  produces: ["application/json"],
  components: {
    securitySchemes: {
      Authorization: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        value: "Bearer <JWT token here>",
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
