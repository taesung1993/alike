import CustomError from "@classes/custom-error.class";
import { RESPONSE_CODE } from "@config/errors";
import { User } from "@models/user";
import jwtService from "@services/jwt.service";
import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { BaseError } from "sequelize";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userIdFromToken = jwtService.getUserIdFromRequest(req);
    const account = await User.findByPk(userIdFromToken);
    const medium = await account?.getMedia();
    const { password: _, ...user } = account!.dataValues;

    res.locals.user = {
      ...user,
      avatar: medium,
    };

    next();
  } catch (error) {
    if (error instanceof CustomError) {
      return res.status(error.status).json({ error: error.message });
    }

    if (error instanceof JsonWebTokenError) {
      return res
        .status(RESPONSE_CODE.UNAUTHORIZED)
        .json({ error: error.message });
    }

    if (error instanceof BaseError) {
      return res
        .status(RESPONSE_CODE.UNAUTHORIZED)
        .json({ error: error.message });
    }

    res
      .status(RESPONSE_CODE.UNAUTHORIZED)
      .json({ error: "유효한 자격 증명이 없습니다." });
  }
};
