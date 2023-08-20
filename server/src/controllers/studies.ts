import CustomError from "@classes/custom-error.class";
import { sequelize } from "@config/db";
import { RESPONSE_CODE } from "@config/errors";
import { Class } from "@models/class";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { BaseError } from "sequelize";

export const getStudies = async (_: Request, res: Response) => {
  try {
    const classes = await Class.findAll({
      include: [
        {
          association: "media",
        },
        {
          association: "likes",
          attributes: ["id", "name", "createdAt", "updatedAt"],
          through: { attributes: [] },
        },
        {
          subQuery: true,
          association: "participants",
          attributes: [
            "id",
            "name",
            "createdAt",
            "updatedAt",
            [
              sequelize.literal('"participants->JoinedClass"."userType"'),
              "userType",
            ],
          ],
          include: [
            {
              association: "medium",
            },
          ],
          through: { attributes: [] },
        },
      ],
    });

    res.json(classes);
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(RESPONSE_CODE.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

export const getStudy = async (req: Request, res: Response) => {
  try {
    const id = req.params._id as string | undefined;
    const classItem = await Class.findByPk(id, {
      include: [
        {
          association: "media",
        },
        {
          association: "likes",
          attributes: ["id", "name", "createdAt", "updatedAt"],
          through: { attributes: [] },
        },
        {
          subQuery: true,
          association: "participants",
          attributes: [
            "id",
            "name",
            "createdAt",
            "updatedAt",
            [
              sequelize.literal('"participants->JoinedClass"."userType"'),
              "userType",
            ],
          ],
          include: [
            {
              association: "medium",
            },
          ],
          through: { attributes: [] },
        },
      ],
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

export const createStudy = async (req: Request, res: Response) => {
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

    const userId = res.locals.user as string;
    const createdClassItem = await Class.create({
      name,
      description,
      location,
      startDate,
      status,
      maximumPerson,
      category,
    });

    await createdClassItem.setUser(userId);
    await createdClassItem.addMedia(media);
    await createdClassItem.addParticipant(userId, {
      through: { userType: "owner" },
    });

    return res.json({ success: true });
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

export const joinStudy = async (req: Request, res: Response) => {
  const classId = req.params._id;
  const userId = res.locals.user;

  try {
    const foundClass = await Class.findByPk(classId);

    if (!foundClass) {
      throw new CustomError({
        status: RESPONSE_CODE.NOT_FOUND,
        message: "Not class",
      });
    }

    await foundClass.addParticipant(userId, {
      through: { userType: "viewer" },
    });

    return res.json({ success: true });
  } catch (error) {
    console.log(error);

    if (error instanceof CustomError) {
      return res.status(error.status).json({ error: error.message });
    }

    res
      .status(RESPONSE_CODE.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

export const withdrawalStudy = async (req: Request, res: Response) => {
  const classId = req.params._id;
  const userId = res.locals.user;

  try {
    const foundClass = await Class.findByPk(classId);

    if (!foundClass) {
      throw new CustomError({
        status: RESPONSE_CODE.NOT_FOUND,
        message: "Not class",
      });
    }

    const creator = foundClass.get("creator") as string;

    if (userId === creator) {
      throw new CustomError({
        status: RESPONSE_CODE.FORBIDDEN,
        message: "The owner can't withdrawal",
      });
    }

    await foundClass.removeParticipant(userId);

    return res.json({ success: true });
  } catch (error) {
    console.log(error);

    if (error instanceof CustomError) {
      return res.status(error.status).json({ error: error.message });
    }

    res
      .status(RESPONSE_CODE.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

export const likeStudy = async (req: Request, res: Response) => {
  const userId = res.locals.user;
  const classId = req.params._id;

  try {
    const foundClass = await Class.findByPk(classId, {
      include: {
        all: true,
        nested: true,
      },
    });

    if (!foundClass) {
      throw new CustomError({
        status: RESPONSE_CODE.NOT_FOUND,
        message: "Not class",
      });
    }

    await foundClass.addLike(userId);

    res.json({ success: true });
  } catch (error) {
    if (error instanceof CustomError) {
      return res.status(error.status).json({ error: error.message });
    }

    res
      .status(RESPONSE_CODE.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

export const cancelToLikeStudy = async (req: Request, res: Response) => {
  const userId = res.locals.user;
  const classId = req.params._id;

  try {
    const foundClass = await Class.findByPk(classId, {
      include: {
        all: true,
        nested: true,
      },
    });

    if (!foundClass) {
      throw new CustomError({
        status: RESPONSE_CODE.NOT_FOUND,
        message: "Not class",
      });
    }

    const foundLikedUser = await foundClass.hasLike(userId);

    if (!foundLikedUser) {
      throw new CustomError({
        status: RESPONSE_CODE.NOT_FOUND,
        message: "Not Found Liked user",
      });
    }

    await foundClass.removeLike(userId);

    res.json({ success: true });
  } catch (error) {
    if (error instanceof CustomError) {
      return res.status(error.status).json({ error: error.message });
    }

    res
      .status(RESPONSE_CODE.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

export const patchStudy = async (req: Request, res: Response) => {
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
    if (error instanceof CustomError) {
      return res.status(error.status).json({ error: error.message });
    }

    res
      .status(RESPONSE_CODE.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal server error" });
  }
};

export const deleteStudy = async (req: Request, res: Response) => {
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
