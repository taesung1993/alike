import express from "express";
import categories from "./categories";
import classes from "./classes";

const routers = express.Router();

routers.use("/categories", categories);
routers.use("/classes", classes);

export default routers;
