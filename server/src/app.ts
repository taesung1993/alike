import express, { Express } from "express";
import helmet from "helmet";
import routers from "@routers/.";
import { sequelize } from "@config/db";
import { redis } from "@config/redis";
import swagger from "@config/swagger/swagger";
import "@models/assocations";

const app: Express = express();

export const initServer = async (port: number) => {
  try {
    await sequelize.sync({ force: false });
    await redis.connect();

    app.use(helmet());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(routers);

    app.use("/api-docs", swagger.serve(), swagger.setup());
    app.listen(port, () => {
      console.log(`[server]: Server is running at ${port}`);
    });
  } catch (error) {
    console.error("Unable to sync models with the database:", error);
  }
};

export default app;
