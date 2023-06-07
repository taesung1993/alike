import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  BelongsToManyGetAssociationsMixin,
  BelongsToManySetAssociationsMixin,
  BelongsToManyAddAssociationsMixin,
  BelongsToManyHasAssociationsMixin,
  BelongsToManyCreateAssociationMixin,
} from "sequelize";
import { sequelize } from "@config/db";
import { Media } from "@models/media";

export interface IClass {
  id: number;
  name: string;
  description: string;
  location: string;
  startDate: string;
  status: string;
  maximumPerson: number;
  categoryId: number;
}

export class Class extends Model<
  InferAttributes<Class>,
  InferCreationAttributes<Class>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare description: string;
  declare location: string;
  declare startDate: string;
  declare status: string;
  declare maximumPerson: number;
  declare categoryId: number;

  declare getMedia: BelongsToManyGetAssociationsMixin<Media>;
  declare setMedia: BelongsToManySetAssociationsMixin<Media, number>;
  declare addMedia: BelongsToManyAddAssociationsMixin<Media, number>;
  declare hasMedia: BelongsToManyHasAssociationsMixin<Media, number>;
  declare createMedia: BelongsToManyCreateAssociationMixin<Media>;
}

Class.init(
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
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "class",
    sequelize,
  }
);

Class.belongsToMany(Media, {
  through: "classMedia",
  as: "media",
  foreignKey: "classId",
});
Media.belongsToMany(Class, {
  through: "classMedia",
  as: "application",
  foreignKey: "mediaId",
});

export default {};
