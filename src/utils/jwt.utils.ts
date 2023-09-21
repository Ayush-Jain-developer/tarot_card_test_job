import { UnauthorizedExceptionError } from "@exceptions";
import { UserInterface } from "@interfaces";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import Messages from "@messages";

const NODE_ENV = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${NODE_ENV}` });
const secretKey = process.env.SECRET_KEY as string;

class Jwt {
  static createToken(payLoad: Omit<UserInterface, "confirmPassword">) {
    return jwt.sign(payLoad, secretKey);
  }

  static verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.header("Authorization");

    if (!token) {
      throw new UnauthorizedExceptionError(Messages.tokenMissing);
    }

    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        return next(new UnauthorizedExceptionError(Messages.invalidToken));
      }
      const result = decoded as jwt.JwtPayload;
      req.body.id = result.id;
      return next();
    });
  }
}

export default Jwt;