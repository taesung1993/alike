import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "../config/db";
import { Class } from "./class";

export interface ICategory {
  id: number;
  name: string;
}

export class Category extends Model<
  InferAttributes<Category>,
  InferCreationAttributes<Category>
> {
  declare id: CreationOptional<Category>;
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

Category.hasMany(Class, {
  sourceKey: "id",
  foreignKey: "categoryId",
  as: "class",
});

export default {};
