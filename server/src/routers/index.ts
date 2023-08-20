import express from "express";
import categories from "@routers/categories";
import studies from "@routers/studies";
import media from "@routers/media";
import user from "@routers/user";

const routers = express.Router();

routers.use("/categories", categories);
routers.use("/studies", studies);
routers.use("/media", media);
routers.use("/user", user);

export default routers;
