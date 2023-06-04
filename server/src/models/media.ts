import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
import { sequelize } from "../config/db";

export type MediaModel = "class" | "user";

export interface IMedia {
  id: string;
  url: string;
  model: MediaModel;
}

export class Media extends Model<
  InferAttributes<Media>,
  InferCreationAttributes<Media>
> {
  declare id: CreationOptional<string>;
  declare model: MediaModel;
  declare url: CreationOptional<string>;
}

Media.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    model: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "media",
    sequelize,
  }
);

export default {};
