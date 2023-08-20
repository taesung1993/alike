import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "@config/db";

export interface ILikedStudy {
  id: string;
}

export class LikedStudy extends Model<
  InferAttributes<LikedStudy>,
  InferCreationAttributes<LikedStudy>
> {
  declare id: CreationOptional<string>;
}

LikedStudy.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    tableName: "likedStudy",
    sequelize,
  }
);

export default {};
