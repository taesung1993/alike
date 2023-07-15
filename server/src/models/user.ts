import {
  Association,
  BelongsToManyGetAssociationsMixin,
  CreationOptional,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasOneGetAssociationMixin,
  HasOneSetAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { sequelize } from "@config/db";
import { Media } from "./media";
import { Class } from "./class";

export interface IUser {
  id: string;
  name: string;
  email: string;
  password: string;
}

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare email: string;
  declare password: string;

  declare setMedia: HasOneSetAssociationMixin<Media, string>;
  declare getMedia: HasOneGetAssociationMixin<Media>;

  declare getCreatedClasses: HasManyGetAssociationsMixin<Class>;
  declare removeCreatedClasses: HasManyRemoveAssociationMixin<Class, string>;

  declare getJoinedClasses: BelongsToManyGetAssociationsMixin<Class>;

  static associations: {
    avatar: Association<User, Media>;
  };
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "user",
    sequelize,
  }
);

export default {};
