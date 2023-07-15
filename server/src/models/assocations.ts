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

User.hasMany(Class, {
  foreignKey: "creator",
  as: "createdClasses",
  constraints: false,
  onDelete: "CASCADE",
});
Class.belongsTo(User, {
  foreignKey: "creator",
  constraints: false,
  onDelete: "CASCADE",
});

Class.belongsToMany(User, { through: "participants" });
User.belongsToMany(Class, { as: "joinedClasses", through: "participants" });

Class.belongsToMany(User, { as: "likes", through: "like_classes" });
User.belongsToMany(Class, { as: "likedClasses", through: "like_classes" });

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
