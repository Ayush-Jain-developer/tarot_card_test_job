import { models } from "@database/models";
import { RatingInterface } from "@interfaces";

class RatingRepo {
  static createRating(data: RatingInterface) {
    return models.ratings.create(data);
  }
}

export default RatingRepo;
