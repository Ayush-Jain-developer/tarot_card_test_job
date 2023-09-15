import { NextFunction, Request, Response } from "express";
import { UserService } from "@service";
import { apiResponse } from "@helper";
import { UserInterface } from "@interfaces";
import { Messages } from "@messages";

export class UserController {
  static async signUp(req: Request, res:Response, next:NextFunction) {
    const data:UserInterface = req.body;
    try {
      const response = await UserService.signUp(data);
      const message = Messages.signedUp
      return apiResponse(res, 200, message, response);
    } catch (error: any) {
      next(error)
    }
  }
}
