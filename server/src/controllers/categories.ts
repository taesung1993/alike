import CustomError from "@classes/custom-error.class";
import { sequelize } from "@config/db";
import { Category } from "@models/category";
import { Request, Response } from "express";

export const createCategory = async (
  req: Request<any, any, { name: string }>,
  res: Response
) => {
  const { name } = req.body;
  try {
    const category = await Category.create({ name });
    res.json(category);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getCategory = async (req: Request, res: Response) => {
  try {
    const pk = Number(req.params._id);
    const category = await Category.findByPk(pk);

    if (!category) {
      return res.json(null);
    }

    const classes = await category.getClasses();
    const json = {
      ...category.toJSON(),
      classCount: classes.length,
    };

    return res.json(json);
  } catch (error: any) {
    const status = error?.status || 400;
    const message = error?.message || "Internal server error";

    res.status(status).json({ error: message });
  }
};

export const getCategories = async (_: Request, res: Response) => {
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
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const pk = Number(req.params._id);
    const category = await Category.findByPk(pk);

    if (!category) {
      throw new CustomError({
        status: 404,
        message: "Not category",
      });
    }

    await category.destroy({ force: true });
    return res.json({ success: true });
  } catch (error: any) {
    if (error instanceof CustomError) {
      return res.status(error.status).json({ error: error.message });
    }

    const status = error?.status || 400;
    const message = error?.message || "Internal server error";

    res.status(status).json({ error: message });
  }
};
