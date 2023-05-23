import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
  }
);

export const initDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database Connected");
  } catch (error) {
    console.log("Database Connection Error:", error);
  }
};
