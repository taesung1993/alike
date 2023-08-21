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
  BelongsToManyAddAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyRemoveAssociationMixin,
  BelongsToManyAddAssociationsMixin,
  BelongsToManyHasAssociationMixin,
  Sequelize,
} from "sequelize";
import { Media } from "./media";
import { User } from "./user";
import { IModel } from ".";

export interface IStudy {
  id: string;
  name: string;
  description: string;
  location: string;
  startDate: string;
  status: string;
  maximumPerson: number;
  category: number;
}

export class Study extends Model<
  InferAttributes<Study>,
  InferCreationAttributes<Study>
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

  declare addParticipant: BelongsToManyAddAssociationMixin<User, string>;
  declare getParticipants: BelongsToManyGetAssociationsMixin<User>;
  declare removeParticipant: BelongsToManyRemoveAssociationMixin<User, string>;

  declare addLike: BelongsToManyAddAssociationsMixin<User, string>;
  declare removeLike: BelongsToManyRemoveAssociationMixin<User, string>;
  declare getLikes: BelongsToManyGetAssociationsMixin<User>;
  declare hasLike: BelongsToManyHasAssociationMixin<User, string>;

  static associations: {
    media: Association<Study, Media>;
  };

  static initModel(sequelize: Sequelize): typeof Study {
    Study.init(
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
        tableName: "study",
        sequelize,
      }
    );

    return Study;
  }

  static associate({ Category, Media, User, JoinedStudy, LikedStudy }: IModel) {
    Study.belongsTo(Category, {
      foreignKey: "category",
    });

    Study.hasMany(Media, {
      foreignKey: "application",
      constraints: false,
      scope: {
        model: "class",
      },
      as: "media",
    });

    Study.belongsTo(User, {
      foreignKey: "creator",
      constraints: false,
      onDelete: "CASCADE",
    });

    Study.belongsToMany(User, {
      as: "participants",
      through: JoinedStudy,
    });

    Study.belongsToMany(User, { as: "likes", through: LikedStudy });
  }
}
