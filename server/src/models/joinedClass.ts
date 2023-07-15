import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "@config/db";

export interface IJoinedClass {
  id: string;
  userType: string;
}

export class JoinedClass extends Model<
  InferAttributes<JoinedClass>,
  InferCreationAttributes<JoinedClass>
> {
  declare id: CreationOptional<string>;
  declare userType: string;
}

JoinedClass.init(
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
    tableName: "joinedClass",
    sequelize,
  }
);

export default {};
