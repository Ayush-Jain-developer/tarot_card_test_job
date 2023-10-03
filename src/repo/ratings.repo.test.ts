import { models } from "@database/models";
import RatingRepo from "./ratings.repo";

const mockCreateRatingData = {
  senderId: "4d03f61c-9912-418a-8809-91fbb73ceb05",
  receiverId: "4d03f61c-9912-418a-8809-91fbb73ceb04",
  rating: 3,
};

describe("Rating repo", () => {
  test("should create rating", async () => {
    models.ratings.create = jest.fn().mockImplementation(() => "Rating");
    const result = await RatingRepo.createRating(mockCreateRatingData);
    expect(models.ratings.create).toBeCalledWith(mockCreateRatingData);
    expect(result).toBe("Rating");
  });

  test("should find rating", async () => {
    models.ratings.findOne = jest.fn().mockResolvedValue("Rating");
    const result = await RatingRepo.findRating(
      mockCreateRatingData.senderId,
      mockCreateRatingData.receiverId,
    );
    expect(models.ratings.findOne).toBeCalledWith({
      where: {
        senderId: mockCreateRatingData.senderId,
        receiverId: mockCreateRatingData.receiverId,
      },
    });
    expect(result).toBe("Rating");
  });
});
