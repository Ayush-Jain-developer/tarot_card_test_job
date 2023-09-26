import { NextFunction, Request, Response } from "express";
import { UserService } from "@service";
import { apiResponse } from "@helper";
import { ReaderBioInterface, UserInterface } from "@interfaces";
import Messages from "@messages";
import { Jwt } from "@utils";

class UserController {
  static async signUp(req: Request, res: Response, next: NextFunction) {
    const data: UserInterface = req.body;

    try {
      const response = await UserService.signUp(req, data);
      const message = Messages.signedUp;
      return apiResponse(res, 200, message, response);
    } catch (error: any) {
      return next(error);
    }
  }

  static async logIn(req: Request, res: Response, next: NextFunction) {
    const data: { email: string; password: string } = req.body;
    try {
      const response = await UserService.logIn(req, data);
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
      const response = await UserService.updateReaderProfile(req, data);
      const message = Messages.readerBioCreated;
      return apiResponse(res, 200, message, response[1][0]);
    } catch (error) {
      return next(error);
    }
  }

  static async tokenGeneration(req: Request, res: Response) {
    const userId = req.body.id;
    const response = Jwt.createTokens({ id: userId });
    const message = Messages.tokensGenerated;
    return apiResponse(res, 200, message, {
      ...response,
      refreshTokenExpiry: Messages.refreshTokenExpiry,
    });
  }

  static async getUser(req: Request, res: Response, next: NextFunction) {
    const userId = req.body.id;
    try {
      const response = await UserService.getUser(userId);
      const message = Messages.userData;
      return apiResponse(res, 200, message, response);
    } catch (error) {
      return next(error);
    }
  }

  static async getAllReaders(req: Request, res: Response, next: NextFunction) {
    const { pageNumber, pageSize } = req.query;
    try {
      const response = await UserService.getAllReaders(
        Number(pageNumber),
        Number(pageSize),
      );
      const message = Messages.readerPaginatedData;
      return apiResponse(res, 200, message, response);
    } catch (error) {
      return next(error);
    }
  }
}
export default UserController;
