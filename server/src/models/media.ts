import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  Sequelize,
} from "sequelize";
import { IModel } from ".";

export interface IMedia {
  id: string;
  url: string;
  name: string;
  type: string;
  model: string;
}

export class Media extends Model<
  InferAttributes<Media>,
  InferCreationAttributes<Media>
> {
  declare id: CreationOptional<string>;
  declare url: CreationOptional<string>;
  declare name: CreationOptional<string>;
  declare type: CreationOptional<string>;
  declare model: string;

  static initModel(sequelize: Sequelize): typeof Media {
    Media.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        url: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        type: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        model: {
          type: DataTypes.STRING,
          allowNull: true,
        },
      },
      {
        tableName: "media",
        sequelize,
      }
    );

    return Media;
  }

  static associate({ Study, User }: IModel) {
    Media.belongsTo(Study, {
      targetKey: "id",
      foreignKey: "application",
      constraints: false,
    });

    Media.belongsTo(User, {
      targetKey: "id",
      foreignKey: "application",
      constraints: false,
    });
  }
}
