import express, { Request, Response } from "express";
import { BaseError } from "sequelize";
import { Class } from "@models/class";
import { Media } from "@models/media";

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

router.get("/:_id", async (req: Request, res: Response) => {
  try {
    const id = req.params._id as string | undefined;
    const classItem = await Class.findByPk(id);

    res.json(classItem);
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
    const createdClassItem = await Class.create({
      name,
      description,
      location,
      startDate,
      status,
      maximumPerson,
      categoryId,
    });
    await createdClassItem.addMedia(media);

    const id = createdClassItem.getDataValue("id");
    const classItem = await Class.findByPk(id!, {
      include: {
        model: Media,
        as: "media",
        attributes: ["id", "model", "url"],
        through: {
          attributes: [],
        },
      },
    });

    return res.json(classItem);
  } catch (error) {
    if (error instanceof BaseError) {
      return res.status(500).json({ error: error.message });
    }

    if (error instanceof TypeError) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
