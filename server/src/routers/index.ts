import express from "express";
import categories from "@routers/categories";
import classes from "@routers/classes";
import media from "@routers/media";
import user from "@routers/user";

const routers = express.Router();

routers.use("/categories", categories);
routers.use("/classes", classes);
routers.use("/media", media);
routers.use("/user", user);

export default routers;
