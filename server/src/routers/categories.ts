import express, { Request, Response } from "express";
import { Category } from "@models/category";
import { sequelize } from "@config/db";

const router = express.Router();

router.get("/", async (_: Request, res: Response) => {
  try {
    const categories = await Category.findAll({
      attributes: {
        include: [
          [
            sequelize.literal(
              '(SELECT COUNT(*) FROM "class" WHERE "class"."categoryId" = "Category"."id")::integer'
            ),
            "classCount",
          ],
        ],
      },
    });

    res.json(categories);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/:_id", async (req: Request, res: Response) => {
  try {
    const pk = Number(req.params._id);

    const category = await Category.findByPk(pk, {
      attributes: {
        include: [
          [
            sequelize.literal(
              '(SELECT COUNT(*) FROM "class" WHERE "class"."categoryId" = "category"."id")::integer'
            ),
            "classCount",
          ],
        ],
      },
    });

    return res.json(category?.dataValues || null);
  } catch (error: any) {
    const status = error?.status || 400;
    const message = error?.message || "Internal server error";

    res.status(status).json({ error: message });
  }
});

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

export default router;
