import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  HasManyGetAssociationsMixin,
  HasManySetAssociationsMixin,
  HasManyAddAssociationsMixin,
} from "sequelize";
import { sequelize } from "../config/db";
import { Media, MediaModel } from "./media";

export interface IClass {
  id: number;
  name: string;
  description: string;
  location: string;
  startDate: string;
  status: string;
  maximumPerson: number;
  categoryId: number;
  // photos: string[];
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
  // declare photos: string[];
  declare getPhotos: HasManyGetAssociationsMixin<Media>;
  declare setPhotos: HasManySetAssociationsMixin<Media, string>;
  declare addPhotos: HasManyAddAssociationsMixin<Media, string>;
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
    // photos: {
    //   type: DataTypes.ARRAY(DataTypes.STRING),
    //   allowNull: false,
    // },
  },
  {
    tableName: "class",
    sequelize,
  }
);

Class.hasMany(Media, {
  sourceKey: "id",
  foreignKey: "modelId",
  as: "photos",
});

Media.belongsTo(Class, {
  targetKey: "id",
  foreignKey: "modelId",
});

export default {};
