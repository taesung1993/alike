import express from "express";
import categories from "./categories";
import classes from "./classes";
import media from "./media";

const routers = express.Router();

routers.use("/categories", categories);
routers.use("/classes", classes);
routers.use("/media", media);

export default routers;
