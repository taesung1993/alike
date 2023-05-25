import {
  DataTypes,
  ForeignKey,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import { sequelize } from "../config/db";

export interface IClass {
  id: number;
  name: string;
  description: string;
  location: string;
  startDate: string;
  status: string;
  maximumPerson: number;
  categoryId: number;
}

export class Class extends Model<
  InferAttributes<Class>,
  InferCreationAttributes<Class>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare description: string;
  declare location: string;
  declare startDate: string;
  declare status: string;
  declare maximumPerson: number;
  declare categoryId: number;
}

Class.init(
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
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    maximumPerson: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "class",
    sequelize,
  }
);

export default {};
