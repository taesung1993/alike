import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "@config/db";

export interface IJoinedStudy {
  id: string;
  userType: string;
}

export class JoinedStudy extends Model<
  InferAttributes<JoinedStudy>,
  InferCreationAttributes<JoinedStudy>
> {
  declare id: CreationOptional<string>;
  declare userType: string;
}

JoinedStudy.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    userType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "joinedStudy",
    sequelize,
  }
);

export default {};
