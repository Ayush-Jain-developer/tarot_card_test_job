import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
import { UnauthorizedExceptionError } from "@exceptions";
import Messages from "@messages";
import Jwt from "./jwt.utils";

const NODE_ENV = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${NODE_ENV}` });
const secretKey = process.env.SECRET_KEY as string;

describe("Jwt", () => {
  test("should create token", () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRkMDNmNjFjLTk5MTItNDE4YS04O";
    const payLoad = {
      id: "4d03f61c-9912-418a-8809-91fbb73ceb05",
    };
    jwt.sign = jest.fn().mockReturnValue(token);
    const result = Jwt.createTokens(payLoad);
    expect(jwt.sign).toBeCalledWith(payLoad, secretKey, {
      expiresIn: "2d",
    });
    expect(jwt.sign).toBeCalledWith(payLoad, secretKey, {
      expiresIn: "7d",
    });
    expect(result).toStrictEqual({ accessToken: token, refreshToken: token });
  });
  test("should return error for missing token", () => {
    const req = {} as Request;
    const res = {} as Response;
    const next = {} as NextFunction;
    req.header = jest.fn().mockReturnValue("");
    try {
      Jwt.verifyToken(req, res, next);
    } catch (error: any) {
      expect(error).toBeInstanceOf(UnauthorizedExceptionError);
      expect(error.message).toBe(Messages.tokenMissing);
    }
  });

  //   test("should return error for expired token", () => {
  //     const req = {} as Request;
  //     req.header = jest.fn().mockResolvedValue("ExpiredToken");
  //     const res = {} as Response;
  //     const next = jest.fn();
  //     jwt.verify = jest.fn().mockImplementation(() => {
  //       {
  //         ("TokenExpiredError");
  //       }
  //     });
  //     Jwt.verifyToken(req, res, next);
  //     expect(next).toBeCalledWith(
  //       new UnauthorizedExceptionError(Messages.tokenExpired),
  //     );
  //   });
});
