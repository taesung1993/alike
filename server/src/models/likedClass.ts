import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "@config/db";

export interface ILikedClass {
  id: string;
}

export class LikedClass extends Model<
  InferAttributes<LikedClass>,
  InferCreationAttributes<LikedClass>
> {
  declare id: CreationOptional<string>;
}

LikedClass.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
  },
  {
    tableName: "likedClass",
    sequelize,
  }
);

export default {};
