import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import { sequelize } from "@config/db";

export interface IMedia {
  id: string;
  url: string;
  name: string;
  type: string;
  model: "avatar" | "class";
}

export class Media extends Model<
  InferAttributes<Media>,
  InferCreationAttributes<Media>
> {
  declare id: CreationOptional<string>;
  declare url: CreationOptional<string>;
  declare name: CreationOptional<string>;
  declare type: CreationOptional<string>;
  declare model: string;
  declare modelType: string;
}

Media.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    modelType: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "media",
    sequelize,
  }
);

export default {};
