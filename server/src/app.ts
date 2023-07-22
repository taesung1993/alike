import express, { Express } from "express";
import helmet from "helmet";
import routers from "@routers/.";
import { sequelize } from "@config/db";
import { redis } from "@config/redis";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import "@models/assocations";

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "LogRocket Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "LogRocket",
        url: "https://logrocket.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
const app: Express = express();

export const initServer = async (port: number) => {
  try {
    await sequelize.sync({ force: false });
    await redis.connect();
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
    app.listen(port, () => {
      console.log(`[server]: Server is running at ${port}`);
    });
  } catch (error) {
    console.error("Unable to sync models with the database:", error);
  }
};

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routers);

export default app;
