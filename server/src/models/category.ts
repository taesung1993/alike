import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

export interface ICategory {
  id: number;
  name: string;
}

type CategoryCreationAttributes = Omit<ICategory, "id">;

export class Category extends Model<ICategory, CategoryCreationAttributes> {
  declare id: number;
  declare name: string;
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "category",
    sequelize,
  }
);

export default {};
