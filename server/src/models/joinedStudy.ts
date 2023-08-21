import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

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

  static initModel(sequelize: Sequelize): typeof JoinedStudy {
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

    return JoinedStudy;
  }
}

export default {};
