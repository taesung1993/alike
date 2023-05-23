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

router.get("/:_id", async (req: Request, res: Response, next) => {
  try {
    const pk = Number(req.params._id);

    if (isNaN(pk)) {
      throw {
        status: 404,
        message: "해당 카테고리를 찾을 수 없습니다.",
      };
    }

    const category = await Category.findByPk(pk);

    if (category) {
      return res.json(category.dataValues);
    }

    throw {
      status: 404,
      message: "해당 카테고리를 찾을 수 없습니다.",
    };
  } catch (error: any) {
    const status = error?.status || 400;
    const message = error?.message || "Internal server error";

    res.status(status).json({ error: message });
  }
});

export default router;
