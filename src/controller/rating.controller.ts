import { apiResponse } from "@helper";
import Messages from "@messages";
import { RatingService } from "@service";
import { Request, Response, NextFunction } from "express";

class RatingController {
  static async createRating(req: Request, res: Response, next: NextFunction) {
    const data = req.body;
    try {
      const response = await RatingService.createRating(data);
      const message = Messages.userRating;
      return apiResponse(res, 200, message, response);
    } catch (error: any) {
      return next(error);
    }
  }
}

export default RatingController;
