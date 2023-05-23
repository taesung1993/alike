import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import { Category } from "./category";

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

interface Models {
  Category: typeof Category;
  Class: typeof Class;
}

type ClassCreationAttributes = Omit<IClass, "id">;

export class Class extends Model<IClass, ClassCreationAttributes> {
  declare id: number;
  declare name: string;
  declare description: string;
  declare location: string;
  declare startDate: string;
  declare status: string;
  declare maximumPerson: number;
  declare categoryId: number;

  declare static associate: (models: Models) => void;
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
      type: DataTypes.NUMBER,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  },
  {
    tableName: "class",
    sequelize,
  }
);

Class.associate = (models) => {
  Class.belongsTo(models.Category, {
    foreignKey: "categoryId",
    targetKey: "id",
  });
};

export default {};
