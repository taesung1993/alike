import CustomError from "@classes/custom-error.class";
import { User } from "@models/user";
import { Request } from "express";
import jwt from "jsonwebtoken";

class JwtService {
  createJWT(user: User) {
    const token = jwt.sign(
      {
        id: user.get("id"),
        email: user.get("email"),
        name: user.get("name"),
      },
      process.env.SECRET_KEY!,
      {
        expiresIn: 1 * 24 * 60 * 60 * 1000,
      }
    );

    return token;
  }

  getUserIdFromRequest(req: Request) {
    const token = this.extractTokenFromRequest(req);

    if (!token) {
      throw new CustomError({
        status: 401,
        message: "유효한 자격 증명이 없습니다.",
      });
    }

    const jwtPayload = this.decodeJWT(token);

    return (jwtPayload as jwt.JwtPayload)?.id;
  }

  extractTokenFromRequest(req: Request) {
    const TOKEN_PREFIX = "Bearer ";
    const auth = req.headers.authorization;
    const token = auth?.startsWith(TOKEN_PREFIX)
      ? auth.split(TOKEN_PREFIX)[1]
      : auth;
    return token;
  }

  decodeJWT(token: string) {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY!);
    return decodedToken;
  }
}

export default new JwtService();
