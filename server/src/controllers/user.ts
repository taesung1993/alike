import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "@models/user";
import jwtService from "@services/jwt.service";
import { BaseError } from "sequelize";
import CustomError from "@classes/custom-error.class";
import { validationResult } from "express-validator";
import { RESPONSE_CODE } from "@config/errors";

export const signUpNewUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const passwordWithHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      password: passwordWithHash,
      email,
    });

    const token = jwtService.createJWT(user);

    return res.status(RESPONSE_CODE.CREATED).json({
      token,
    });
  } catch (error) {
    if (error instanceof BaseError) {
      switch (error.name) {
        case "SequelizeUniqueConstraintError":
          return res
            .status(RESPONSE_CODE.CONFLICT)
            .json({ message: "The Email already registered." });
        default:
          return res
            .status(RESPONSE_CODE.NOT_FOUND)
            .json({ message: error.message });
      }
    }

    return res
      .status(RESPONSE_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: "알 수 없는 에러가 발생하였습니다." });
  }
};

export const signInCurrentUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (user) {
    const isSamePassword = await bcrypt.compare(password, user.password);

    if (isSamePassword) {
      const token = jwtService.createJWT(user);

      return res.status(RESPONSE_CODE.CREATED).json({
        token,
      });
    }
  }

  return res
    .status(RESPONSE_CODE.UNAUTHORIZED)
    .json({ error: "Authentication failed" });
};

export const uploadAvatar = async (req: Request, res: Response) => {
  const { medium } = req.body;
  const id = res.locals.user.id;

  try {
    const user = await User.findByPk(id);
    const result = validationResult(req);

    if (!result.isEmpty()) {
      throw new CustomError({
        status: RESPONSE_CODE.BAD_REQUEST,
        message: result.array()[0].msg,
      });
    }

    if (!user) {
      throw new CustomError({
        status: RESPONSE_CODE.NOT_FOUND,
        message: "Not User",
      });
    }

    await user.setMedia(medium);

    return res.status(RESPONSE_CODE.OK).json({ message: "success" });
  } catch (error) {
    if (error instanceof CustomError) {
      return res.status(error.status).json({ message: error.message });
    }

    if (error instanceof BaseError) {
      return res
        .status(RESPONSE_CODE.NOT_FOUND)
        .json({ message: error.message });
    }

    return res
      .status(RESPONSE_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: "알 수 없는 에러가 발생하였습니다." });
  }
};

export const getMe = async (_: Request, res: Response) => {
  const userId = res.locals.user;
  const user = await User.findByPk(userId);
  const medium = await user?.getMedia();

  return res.status(RESPONSE_CODE.OK).json({
    ...user?.toJSON(),
    medium,
  });
};

export const getIsDuplicateEmail = async (req: Request, res: Response) => {
  try {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      throw new CustomError({
        status: RESPONSE_CODE.BAD_REQUEST,
        message: result.array()[0].msg,
      });
    }

    const email = req.query.email as string;
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    return res.json({ isDuplicate: !!user });
  } catch (error) {
    if (error instanceof CustomError) {
      return res.status(error.status).json({ message: error.message });
    }
    return res
      .status(RESPONSE_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: "알 수 없는 에러가 발생하였습니다." });
  }
};

export const getCreatedClasses = async (_: Request, res: Response) => {
  try {
    const id = res.locals.user;
    const user = await User.findByPk(id);

    if (!user) {
      throw new CustomError({
        status: RESPONSE_CODE.NOT_FOUND,
        message: "Not User",
      });
    }

    const createdClasses = await user!.getCreatedClasses();

    res.json(createdClasses);
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

export const deleteUser = async (req: Request, res: Response) => {
  const id = req.params._id;
  try {
    const user = await User.findByPk(id);

    if (!user) {
      throw new CustomError({
        status: RESPONSE_CODE.NOT_FOUND,
        message: "Not User",
      });
    }

    await user.destroy({ force: true });
    return res.status(RESPONSE_CODE.OK).json({ message: "success" });
  } catch (error) {
    if (error instanceof BaseError) {
      return res
        .status(RESPONSE_CODE.NOT_FOUND)
        .json({ message: error.message });
    }

    return res
      .status(RESPONSE_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: "알 수 없는 에러가 발생하였습니다." });
  }
};
