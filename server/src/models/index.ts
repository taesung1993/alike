import { Sequelize } from "sequelize";
import { Category } from "./category";
import { Study } from "./study";
import { Media } from "./media";
import { User } from "./user";
import { JoinedStudy } from "./joinedStudy";
import { LikedStudy } from "./likedStudy";

export interface IModel {
  Category: typeof Category;
  Study: typeof Study;
  Media: typeof Media;
  User: typeof User;
  JoinedStudy: typeof JoinedStudy;
  LikedStudy: typeof LikedStudy;
}

const models: IModel = {
  Category,
  Study,
  Media,
  User,
  JoinedStudy,
  LikedStudy,
};

export const initModels = (sequelize: Sequelize) => {
  Object.entries(models).forEach(([_, model]) => {
    model.initModel(sequelize);
  });
};

export const initAssociates = () => {
  Object.entries(models).forEach(([_, model]) => {
    if (model.associate) {
      model.associate(models);
    }
  });
};
