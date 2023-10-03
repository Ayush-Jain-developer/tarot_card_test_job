import ValidateFields from "@validations";
import { RatingInterface } from "@interfaces";
import { RatingRepo } from "@repo";
import {
  BadRequestExceptionError,
  UnauthorizedExceptionError,
} from "@exceptions";
import Messages from "@messages";

class RatingService {
  static async createRating(data: RatingInterface): Promise<RatingInterface> {
    ValidateFields.stringRequired(data.senderId, "Sender ID");
    if (data.id !== data.senderId) {
      throw new UnauthorizedExceptionError(Messages.invalidToken);
    }
    ValidateFields.stringRequired(data.receiverId, "Receiver ID");
    ValidateFields.integerRequired(data.rating, "Rating", 1, 5);
    const rating = await RatingRepo.findRating(data.senderId, data.receiverId);
    if (rating?.dataValues) {
      throw new BadRequestExceptionError(Messages.ratingGiven);
    }
    const response = await RatingRepo.createRating(data);
    return response.dataValues;
  }
}

export default RatingService;
