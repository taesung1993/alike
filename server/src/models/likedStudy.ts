import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

export interface ILikedStudy {
  id: string;
}

export class LikedStudy extends Model<
  InferAttributes<LikedStudy>,
  InferCreationAttributes<LikedStudy>
> {
  declare id: CreationOptional<string>;

  static initModel(sequelize: Sequelize): typeof LikedStudy {
    LikedStudy.init(
      {
        id: {
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
          allowNull: false,
        },
      },
      {
        tableName: "likedStudy",
        sequelize,
      }
    );

    return LikedStudy;
  }
}
