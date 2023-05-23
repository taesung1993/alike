import express from "express";
import categories from "./categories";

const routers = express.Router();

routers.use("/categories", categories);

export default routers;
