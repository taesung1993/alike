import express, { Request, Response } from "express";
import { Category } from "../models/category";

const router = express.Router();

router.post(
  "/",
  async (req: Request<any, any, { name: string }>, res: Response) => {
    const { name } = req.body;
    try {
      const category = await Category.create({ name });
      res.json(category);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.get("/", async (_: Request, res: Response) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
