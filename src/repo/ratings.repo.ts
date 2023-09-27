import { models } from "@database/models";
import { RatingInterface } from "@interfaces";

class RatingRepo {
  static createRating(data: RatingInterface) {
    return models.ratings.create(data);
  }

  static findRating(senderId: string, receiverId: string) {
    return models.ratings.findOne({
      where: {
        senderId,
        receiverId,
      },
    });
  }
}

export default RatingRepo;
