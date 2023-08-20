import {
  CreationOptional,
  DataTypes,
  HasManyCountAssociationsMixin,
  HasManyGetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { Study } from "@models/study";
import { sequelize } from "@config/db";

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

  declare getClasses: HasManyGetAssociationsMixin<Study>;
  declare countClasses: HasManyCountAssociationsMixin;
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
