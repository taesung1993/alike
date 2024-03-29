import CustomError from "@classes/custom-error.class";
import { sequelize } from "@config/db";
import { RESPONSE_CODE } from "@config/errors";
import { Category } from "@models/category";
import { Request, Response } from "express";
import { validationResult } from "express-validator";

export const createCategory = async (
  req: Request<any, any, { name: string }>,
  res: Response
) => {
  try {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      const { msg } = result.mapped()["name"];
      throw new CustomError({
        status: RESPONSE_CODE.BAD_REQUEST,
        message: msg,
      });
    }

    const { name } = req.body;
    const category = await Category.create({ name });
    const classCount = await category.countClasses();

    const json = {
      ...category.toJSON(),
      classCount,
    };

    res.json(json);
  } catch (error) {
    if (error instanceof CustomError) {
      return res.status(error.status).json({ error: error.message });
    }

    res
      .status(RESPONSE_CODE.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

export const getCategory = async (req: Request, res: Response) => {
  try {
    const pk = Number(req.params._id);
    const category = await Category.findByPk(pk);

    if (!category) {
      throw new CustomError({
        status: RESPONSE_CODE.NOT_FOUND,
        message: "Not category",
      });
    }

    const classCount = await category.countClasses();
    const json = {
      ...category.toJSON(),
      classCount,
    };

    return res.json(json);
  } catch (error: any) {
    if (error instanceof CustomError) {
      return res.status(error.status).json({ error: error.message });
    }

    const status = error?.status || RESPONSE_CODE.BAD_REQUEST;
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
              '(SELECT COUNT(*) FROM "class" WHERE "class"."category" = "Category"."id")::integer'
            ),
            "classCount",
          ],
        ],
      },
    });

    res.json(categories);
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(RESPONSE_CODE.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const pk = Number(req.params._id);
    const category = await Category.findByPk(pk);

    if (!category) {
      throw new CustomError({
        status: RESPONSE_CODE.NOT_FOUND,
        message: "Not category",
      });
    }

    await category.destroy({ force: true });
    return res.json({ success: true });
  } catch (error: any) {
    if (error instanceof CustomError) {
      return res.status(error.status).json({ error: error.message });
    }

    const status = error?.status || RESPONSE_CODE.BAD_REQUEST;
    const message = error?.message || "Internal server error";

    res.status(status).json({ error: message });
  }
};
