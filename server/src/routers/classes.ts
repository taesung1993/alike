import express, { Request, Response } from "express";
import { Media } from "../models/media";
import { Category } from "../models/category";
import { Class } from "../models/class";
import { BaseError, Sequelize } from "sequelize";

const router = express.Router();

router.get("/", async (_: Request, res: Response) => {
  try {
    const classes = await Class.findAll();
    res.json(classes);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  const {
    name,
    description,
    location,
    startDate,
    status,
    maximumPerson,
    categoryId,
  } = req.body;

  try {
    const classItem = await Class.build({
      name,
      description,
      location,
      startDate,
      status,
      maximumPerson,
      categoryId,
    });

    await classItem.addPhotos(["c56dc7bd-7279-4309-b749-4a86d3345fae1"]);
    await classItem.save();

    const photos = await classItem.getPhotos();
    console.log(photos);

    return res.json({
      ...classItem.dataValues,
      photos: photos,
    });
  } catch (error) {
    if (error instanceof BaseError) {
      return res.status(500).json({ error: error.message });
    }

    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
