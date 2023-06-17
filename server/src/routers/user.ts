import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "@models/user";
import jwtService from "@services/jwt.service";
import { authMiddleware } from "@middlewares/auth.middleware";
import { BaseError } from "sequelize";

const router = express.Router();

router.post("/sign-up", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  const passwordWithHash = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    password: passwordWithHash,
    email,
  });

  if (user) {
    const token = jwtService.createJWT(user);

    return res.status(201).json({
      token,
    });
  }
});

router.post("/sign-in", async (req: Request, res: Response) => {
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
});

router.get("/me", authMiddleware, async (req: Request, res: Response) => {
  const user = res.locals.user;

  delete res.locals["user"];

  return res.status(200).json(user);
});

router.delete("/:id", authMiddleware, async (req: Request, res: Response) => {
  const id = req.params.id;
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
});

export default router;
