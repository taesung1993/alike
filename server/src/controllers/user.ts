import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "@models/user";
import jwtService from "@services/jwt.service";
import { BaseError } from "sequelize";
import CustomError from "@classes/custom-error.class";
import { validationResult } from "express-validator";

export const signUpNewUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const passwordWithHash = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    password: passwordWithHash,
    email,
  });

  const token = jwtService.createJWT(user);

  return res.status(201).json({
    token,
  });
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

      return res.status(201).json({
        token,
      });
    }
  }

  return res.status(401).json({ error: "Authentication failed" });
};

export const uploadAvatar = async (req: Request, res: Response) => {
  const { medium } = req.body;
  const id = res.locals.user.id;

  try {
    const user = await User.findByPk(id);
    const result = validationResult(req);

    if (!result.isEmpty()) {
      throw new CustomError({
        status: 400,
        message: result.array()[0].msg,
      });
    }

    if (!user) {
      throw new CustomError({
        status: 404,
        message: "Not User",
      });
    }

    await user.setMedia(medium);

    return res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);

    if (error instanceof CustomError) {
      return res.status(error.status).json({ message: error.message });
    }

    if (error instanceof BaseError) {
      return res.status(404).json({ message: error.message });
    }

    return res
      .status(500)
      .json({ message: "알 수 없는 에러가 발생하였습니다." });
  }
};

export const getMe = async (_: Request, res: Response) => {
  const user = res.locals.user;

  delete res.locals["user"];

  return res.status(200).json(user);
};

export const deleteUser = async (req: Request, res: Response) => {
  const id = req.params._id;
  try {
    const user = await User.findByPk(id);

    user?.destroy({ force: true });

    return res.status(200).json({ message: "success" });
  } catch (error) {
    if (error instanceof BaseError) {
      return res.status(404).json({ message: error.message });
    }

    return res
      .status(500)
      .json({ message: "알 수 없는 에러가 발생하였습니다." });
  }
};
