import express, { Request, Response } from "express";
import { Category } from "../models/category";
import { Class } from "../models/class";

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
    const classItem = await Class.create({
      name,
      description,
      location,
      startDate,
      status,
      maximumPerson,
      categoryId,
    });

    return res.json(classItem.dataValues);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
