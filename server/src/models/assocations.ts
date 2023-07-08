import { Category } from "./category";
import { Class } from "./class";
import { Media } from "./media";
import { User } from "./user";

Category.hasMany(Class, {
  foreignKey: "category",
  constraints: false,
  as: "classes",
});
Class.belongsTo(Category, {
  foreignKey: "category",
});

Class.hasMany(Media, {
  foreignKey: "application",
  constraints: false,
  as: "media",
});
Media.belongsTo(Class, {
  targetKey: "id",
  foreignKey: "application",
});

User.hasOne(Media, { foreignKey: "application", constraints: false });
Media.belongsTo(User, {
  targetKey: "id",
  foreignKey: "application",
});
