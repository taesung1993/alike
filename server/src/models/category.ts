import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";
import { Class } from "./class";

export interface ICategory {
  id: number;
  name: string;
}

interface Models {
  Category: typeof Category;
  Class: typeof Class;
}

type CategoryCreationAttributes = Omit<ICategory, "id">;

export class Category extends Model<ICategory, CategoryCreationAttributes> {
  declare id: number;
  declare name: string;

  declare static associate: (models: Models) => void;
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

Category.associate = (models) => {
  Category.hasMany(models.Class, {
    foreignKey: "categoryId",
    sourceKey: "id",
  });
};

export default {};
