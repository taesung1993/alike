import express, { Request, Response } from "express";
import { Class } from "../models/class";
import { BaseError } from "sequelize";

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
    media,
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

    await classItem.addPhotos(media);
    await classItem.save();

    const photos = await classItem.getPhotos();

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
