import express, { Express } from "express";
import helmet from "helmet";
import routers from "@routers/.";
import { sequelize } from "@config/db";

const app: Express = express();
export const initServer = async (port: number) => {
  try {
    await sequelize.sync();
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
