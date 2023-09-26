import ValidateFields from "@validations";
import { RatingInterface } from "@interfaces";
import { Request } from "express";
import { RatingRepo } from "@repo";

class RatingService {
  static async createRating(req: Request, data: RatingInterface) {
    ValidateFields.stringRequired(req, data.senderId, "Sender ID");
    ValidateFields.stringRequired(req, data.receiverId, "Receiver ID");
    ValidateFields.integerRequired(data.rating, "Rating");
    const response = await RatingRepo.createRating(data);
    return response.dataValues;
  }
}

export default RatingService;
