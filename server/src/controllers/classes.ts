import CustomError from "@classes/custom-error.class";
import { RESPONSE_CODE } from "@config/errors";
import { Class } from "@models/class";
import { Media } from "@models/media";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { BaseError } from "sequelize";

export const getClasses = async (_: Request, res: Response) => {
  try {
    const classes = await Class.findAll({
      include: {
        model: Media,
        as: "media",
      },
    });

    res.json(classes);
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(RESPONSE_CODE.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

export const getClass = async (req: Request, res: Response) => {
  try {
    const id = req.params._id as string | undefined;
    const classItem = await Class.findByPk(id, {
      include: {
        model: Media,
        as: "media",
      },
    });

    if (!classItem) {
      return res.json(null);
    }

    res.json(classItem.toJSON());
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(RESPONSE_CODE.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
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
    const result = validationResult(req);

    if (!result.isEmpty()) {
      throw new CustomError({
        status: RESPONSE_CODE.BAD_REQUEST,
        message: result.array()[0].msg,
      });
    }

    const createdClassItem = await Class.create({
      name,
      description,
      location,
      startDate,
      status,
      maximumPerson,
      category,
    });

    await createdClassItem.addMedia(media);
    const mediaOfCreatedClass = await createdClassItem.getMedia();

    const json = {
      ...createdClassItem.toJSON(),
      media: mediaOfCreatedClass,
    };

    return res.json(json);
  } catch (error) {
    if (error instanceof CustomError) {
      return res
        .status(RESPONSE_CODE.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }

    if (error instanceof BaseError) {
      return res
        .status(RESPONSE_CODE.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }

    if (error instanceof TypeError) {
      return res
        .status(RESPONSE_CODE.BAD_REQUEST)
        .json({ error: error.message });
    }

    return res
      .status(RESPONSE_CODE.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

export const patchClass = async (req: Request, res: Response) => {
  try {
    const id = req.params._id as string | undefined;
    const body = req.body;

    const classItem = await Class.findByPk(id);
    if (!classItem) {
      throw new CustomError({
        status: RESPONSE_CODE.NOT_FOUND,
        message: "Not class",
      });
    }

    classItem.set(body);
    await classItem.save();

    res.json(classItem.toJSON());
  } catch (error) {
    res
      .status(RESPONSE_CODE.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

export const deleteClass = async (req: Request, res: Response) => {
  try {
    const id = req.params._id as string | undefined;
    const classItem = await Class.findByPk(id);

    if (!classItem) {
      throw new CustomError({
        status: RESPONSE_CODE.NOT_FOUND,
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

    res
      .status(RESPONSE_CODE.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};
