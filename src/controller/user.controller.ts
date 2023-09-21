import { NextFunction, Request, Response } from "express";
import UserService from "@service";
import { apiResponse } from "@helper";
import { ReaderBioInterface, UserInterface } from "@interfaces";
import Messages from "@messages";

class UserController {
  static async signUp(req: Request, res: Response, next: NextFunction) {
    const data: UserInterface = req.body;
    try {
      const response = await UserService.signUp(data);
      const message = Messages.signedUp;
      return apiResponse(res, 200, message, response);
    } catch (error: any) {
      return next(error);
    }
  }

  static async logIn(req: Request, res: Response, next: NextFunction) {
    const data: { email: string; password: string } = req.body;
    try {
      const response = await UserService.logIn(data);
      const message = Messages.loggedIn;
      return apiResponse(res, 200, message, response);
    } catch (error: any) {
      return next(error);
    }
  }

  static async updateReaderProfile(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const data: ReaderBioInterface = req.body;
    try {
      const response = await UserService.updateReaderProfile(data);
      const message = Messages.readerBioCreated;
      return apiResponse(res, 200, message, response[1][0]);
    } catch (error) {
      return next(error);
    }
  }
}
export default UserController;
