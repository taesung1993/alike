import { Category } from "./category";
import { Study } from "./study";
import { JoinedStudy } from "./joinedStudy";
import { LikedStudy } from "./likedStudy";
import { Media } from "./media";
import { User } from "./user";

Category.hasMany(Study, {
  foreignKey: "category",
  constraints: false,
  as: "classes",
});
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
Media.belongsTo(Study, {
  targetKey: "id",
  foreignKey: "application",
  constraints: false,
});

User.hasMany(Study, {
  foreignKey: "creator",
  as: "createdStudies",
  constraints: false,
  onDelete: "CASCADE",
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
User.belongsToMany(Study, { as: "joinedStudies", through: JoinedStudy });

Study.belongsToMany(User, { as: "likes", through: LikedStudy });
User.belongsToMany(Study, { as: "likedClasses", through: LikedStudy });

User.hasOne(Media, {
  foreignKey: "application",
  constraints: false,
  scope: {
    model: "user",
  },
  as: "medium",
});
Media.belongsTo(User, {
  targetKey: "id",
  foreignKey: "application",
  constraints: false,
});
