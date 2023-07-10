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
  scope: {
    model: "class",
  },
  as: "media",
});
Media.belongsTo(Class, {
  targetKey: "id",
  foreignKey: "application",
  constraints: false,
});

Class.belongsToMany(User, { through: "class_participants" });
User.belongsToMany(Class, { through: "class_participants" });

User.hasOne(Media, {
  foreignKey: "application",
  constraints: false,
  scope: {
    model: "user",
  },
  as: "media",
});
Media.belongsTo(User, {
  targetKey: "id",
  foreignKey: "application",
  constraints: false,
});
