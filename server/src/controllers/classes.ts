import CustomError from "@classes/custom-error.class";
import { Class } from "@models/class";
import { Request, Response } from "express";
import { BaseError } from "sequelize";

export const getClasses = async (_: Request, res: Response) => {
  try {
    const classes = await Class.findAll();

    res.json(classes);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getClass = async (req: Request, res: Response) => {
  try {
    const id = req.params._id as string | undefined;
    // const classItem = await Class.findByPk(id, {
    //   include: {
    //     model: Media,
    //     as: "media",
    //     attributes: ["id", "model", "url"],
    //     through: {
    //       attributes: [],
    //     },
    //   },
    // });

    const classItem = await Class.findByPk(id);

    if (!classItem) {
      return res.json(null);
    }

    res.json(classItem.toJSON());
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createClass = async (req: Request, res: Response) => {
  const {
    name,
    description,
    location,
    startDate,
    status,
    maximumPerson,
    category,
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
      category,
    });

    return res.json(createdClassItem.toJSON());
  } catch (error) {
    if (error instanceof BaseError) {
      return res.status(500).json({ error: error.message });
    }

    if (error instanceof TypeError) {
      return res.status(400).json({ error: error.message });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
};

export const patchClass = async (req: Request, res: Response) => {
  try {
    const id = req.params._id as string | undefined;
    const body = req.body;

    const classItem = await Class.findByPk(id);
    if (!classItem) {
      throw new CustomError({
        status: 404,
        message: "Not class",
      });
    }

    classItem.set(body);
    await classItem.save();

    res.json(classItem.toJSON());
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteClass = async (req: Request, res: Response) => {
  try {
    const id = req.params._id as string | undefined;
    // const classItem = await Class.findByPk(id, {
    //   include: {
    //     model: Media,
    //     as: "media",
    //     attributes: ["id", "model", "url"],
    //     through: {
    //       attributes: [],
    //     },
    //   },
    // });

    const classItem = await Class.findByPk(id);

    if (!classItem) {
      throw new CustomError({
        status: 404,
        message: "Not class",
      });
    }

    await classItem.destroy({ force: true });

    res.json({ success: true });
  } catch (error) {
    console.error("Error creating user:", error);

    if (error instanceof CustomError) {
      return res.status(error.status).json({ error: error.message });
    }

    res.status(500).json({ error: "Internal server error" });
  }
};
