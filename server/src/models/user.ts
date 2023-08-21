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
  Sequelize,
} from "sequelize";
import { Media } from "./media";
import { Study } from "./study";
import { IModel } from ".";

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

  declare setMedium: HasOneSetAssociationMixin<Media, string>;
  declare getMedium: HasOneGetAssociationMixin<Media>;

  declare getCreatedClasses: HasManyGetAssociationsMixin<Study>;
  declare removeCreatedClasses: HasManyRemoveAssociationMixin<Study, string>;

  declare getJoinedClasses: BelongsToManyGetAssociationsMixin<Study>;
  declare getLikedClasses: BelongsToManyGetAssociationsMixin<Study>;

  static associations: {
    avatar: Association<User, Media>;
  };

  static initModel(sequelize: Sequelize): typeof User {
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

    return User;
  }

  static associate({ Study, JoinedStudy, LikedStudy, Media }: IModel) {
    User.hasMany(Study, {
      foreignKey: "creator",
      as: "createdStudies",
      constraints: false,
      onDelete: "CASCADE",
    });

    User.hasOne(Media, {
      foreignKey: "application",
      constraints: false,
      scope: {
        model: "user",
      },
      as: "medium",
    });

    User.belongsToMany(Study, { as: "joinedStudies", through: JoinedStudy });

    User.belongsToMany(Study, { as: "likedClasses", through: LikedStudy });
  }
}

export default {};
