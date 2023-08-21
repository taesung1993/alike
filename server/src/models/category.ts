import {
  CreationOptional,
  DataTypes,
  HasManyCountAssociationsMixin,
  HasManyGetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import { Study } from "@models/study";
import { IModel } from ".";

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

  static initModel(sequelize: Sequelize): typeof Category {
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

    return Category;
  }

  static associate({ Study }: IModel) {
    Category.hasMany(Study, {
      foreignKey: "category",
      constraints: false,
      as: "classes",
    });
  }
}
