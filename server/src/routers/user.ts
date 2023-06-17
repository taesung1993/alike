import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "@models/user";
import jwtService from "@services/jwt.service";
import { authMiddleware } from "@middlewares/auth.middleware";

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

export default router;
