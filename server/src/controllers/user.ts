import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "@models/user";
import jwtService from "@services/jwt.service";
import { BaseError, Op } from "sequelize";
import CustomError from "@classes/custom-error.class";
import { validationResult } from "express-validator";
import { RESPONSE_CODE } from "@config/errors";
import { sequelize } from "@config/db";
import { transporter } from "@config/mailer";
import Mail from "nodemailer/lib/mailer";
import path from "path";
import helperService from "@services/helper.service";
import { redis } from "@config/redis";

type ExtendedOptions = Mail.Options & {
  template: string;
  context: Record<string, unknown>;
};

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

export const sendVerificationEmail = async (req: Request, res: Response) => {
  try {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      throw new CustomError({
        status: RESPONSE_CODE.BAD_REQUEST,
        message: result.array()[0].msg,
      });
    }

    const verificationNumber =
      helperService.generateRandomNumberForVeirification();
    const LIMIT_TIME = 180; // 3 minute
    const email = req.body.email;

    const options: ExtendedOptions = {
      from: '"Alike" <alike@example.com>',
      to: email,
      subject: `[Alike] 이메일 계정을 인증해주세요 ('${email}')`,
      template: "verification-email",
      attachments: [
        {
          filename: "alike_logo.png",
          path: path.join(__dirname, "../static/images/alike_logo.png"),
          cid: "alike_logo",
        },
        {
          filename: "mailer.jpg",
          path: path.join(__dirname, "../static/images/mailer.jpg"),
          cid: "mailer",
        },
      ],
      context: {
        code: verificationNumber.split(""),
      },
    };

    await transporter.sendMail(options);
    await redis.setEx(email, LIMIT_TIME, verificationNumber);

    res.json({ success: true });
  } catch (error) {
    console.log(error);

    if (error instanceof CustomError) {
      return res.status(error.status).json({ message: error.message });
    }

    return res
      .status(RESPONSE_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: "알 수 없는 에러가 발생하였습니다." });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      throw new CustomError({
        status: RESPONSE_CODE.BAD_REQUEST,
        message: result.array()[0].msg,
      });
    }

    const { email, code } = req.body;
    const value = await redis.get(email);
    const isSame = code === value;

    if (!value) {
      throw new CustomError({
        status: RESPONSE_CODE.NOT_FOUND,
        message: "Not found the verification code because of timeout",
      });
    }

    if (!isSame) {
      throw new CustomError({
        status: RESPONSE_CODE.BAD_REQUEST,
        message: "The verification numbers don't match.",
      });
    }

    res.json({ success: true });
  } catch (error) {
    console.log(error);

    if (error instanceof CustomError) {
      return res.status(error.status).json({ message: error.message });
    }

    return res
      .status(RESPONSE_CODE.INTERNAL_SERVER_ERROR)
      .json({ message: "알 수 없는 에러가 발생하였습니다." });
  }
};

export const uploadAvatar = async (req: Request, res: Response) => {
  const { medium } = req.body;
  const id = res.locals.user;

  try {
    const user = await User.findByPk(id, {
      include: {
        all: true,
        nested: true,
      },
    });
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

    await user.setMedium(medium);

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
  const user = await User.findByPk(userId, {
    attributes: ["id", "name", "email", "createdAt", "updatedAt"],
    include: {
      association: "medium",
    },
  });

  return res.status(RESPONSE_CODE.OK).json(user);
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

    const createdClasses = await user.getCreatedClasses({
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

export const getJoinedClasses = async (_: Request, res: Response) => {
  try {
    const id = res.locals.user;
    const user = await User.findByPk(id);

    if (!user) {
      throw new CustomError({
        status: RESPONSE_CODE.NOT_FOUND,
        message: "Not User",
      });
    }

    const joinedClasses = await user.getJoinedClasses({
      joinTableAttributes: [],
      where: {
        creator: {
          [Op.ne]: id,
        },
      },
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

    res.json(joinedClasses);
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

export const getLikedClasses = async (req: Request, res: Response) => {
  try {
    const id = res.locals.user;
    const user = await User.findByPk(id);

    if (!user) {
      throw new CustomError({
        status: RESPONSE_CODE.NOT_FOUND,
        message: "Not User",
      });
    }

    const likedClasses = await user.getLikedClasses({
      joinTableAttributes: [],
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

    res.json(likedClasses);
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
