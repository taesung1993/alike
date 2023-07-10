import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationsMixin,
  Association,
  BelongsToSetAssociationMixin,
  BelongsToGetAssociationMixin,
} from "sequelize";
import { sequelize } from "@config/db";
import { Media } from "./media";
import { User } from "./user";

export interface IClass {
  id: string;
  name: string;
  description: string;
  location: string;
  startDate: string;
  status: string;
  maximumPerson: number;
  category: number;
}

export class Class extends Model<
  InferAttributes<Class>,
  InferCreationAttributes<Class>
> {
  declare id: CreationOptional<string>;
  declare name: string;
  declare description: string;
  declare location: string;
  declare startDate: string;
  declare status: string;
  declare maximumPerson: number;
  declare category: number;

  declare getMedia: HasManyGetAssociationsMixin<Media>;
  declare addMedia: HasManyAddAssociationsMixin<Media, string>;

  declare setUser: BelongsToSetAssociationMixin<User, string>;
  declare getUser: BelongsToGetAssociationMixin<User>;

  static associations: {
    media: Association<Class, Media>;
  };
}

Class.init(
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
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "class",
    sequelize,
  }
);

export default {};
