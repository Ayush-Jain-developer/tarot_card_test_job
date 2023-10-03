import {
  BadRequestExceptionError,
  UnauthorizedExceptionError,
} from "@exceptions";
import Messages from "@messages";
import { RatingRepo } from "@repo";
import { RatingService } from "@service";

const mockDataWithNoSenderId = {
  senderId: "",
  receiverId: "46d66d49-224d-430a-8e20-9694a634546b",
  rating: 3,
};

const mockDataWithNoReceiverId = {
  id: "2c26f84b-426a-49b2-8591-ae507e3bcc33",
  senderId: "2c26f84b-426a-49b2-8591-ae507e3bcc33",
  receiverId: "",
  rating: 3,
};

const mockDataMisMatchedIdAndSenderId = {
  id: "46d66d49-224d-430a-8e20-9694a634546b",
  senderId: "2c26f84b-426a-49b2-8591-ae507e3bcc33",
  receiverId: "46d66d49-224d-430a-8e20-9694a634546b",
  rating: 2,
};

const mockDataWithLessrating = {
  id: "2c26f84b-426a-49b2-8591-ae507e3bcc33",
  senderId: "2c26f84b-426a-49b2-8591-ae507e3bcc33",
  receiverId: "46d66d49-224d-430a-8e20-9694a634546b",
  rating: 0,
};

const mockDataWithMorerating = {
  id: "2c26f84b-426a-49b2-8591-ae507e3bcc33",
  senderId: "2c26f84b-426a-49b2-8591-ae507e3bcc33",
  receiverId: "46d66d49-224d-430a-8e20-9694a634546b",
  rating: 6,
};

const mockRatingData = {
  id: "2c26f84b-426a-49b2-8591-ae507e3bcc33",
  senderId: "2c26f84b-426a-49b2-8591-ae507e3bcc33",
  receiverId: "46d66d49-224d-430a-8e20-9694a634546b",
  rating: 2,
};

describe("Rating and review API", () => {
  test("should return error for no senderId", async () => {
    try {
      await RatingService.createRating(mockDataWithNoSenderId);
    } catch (error: any) {
      expect(error).toBeInstanceOf(BadRequestExceptionError);
      expect(error.message).toBe("Sender ID is not allowed to be empty");
    }
  });

  test("should return error for mismatched id and senderId", async () => {
    try {
      await RatingService.createRating(mockDataMisMatchedIdAndSenderId);
    } catch (error: any) {
      expect(error).toBeInstanceOf(UnauthorizedExceptionError);
      expect(error.message).toBe(Messages.invalidToken);
    }
  });

  test("should return error for no receiver id", async () => {
    try {
      await RatingService.createRating(mockDataWithNoReceiverId);
    } catch (error: any) {
      expect(error).toBeInstanceOf(BadRequestExceptionError);
      expect(error.message).toBe("Receiver ID is not allowed to be empty");
    }
  });

  test("should return error for rating less than 1", async () => {
    try {
      await RatingService.createRating(mockDataWithLessrating);
    } catch (error: any) {
      expect(error).toBeInstanceOf(BadRequestExceptionError);
      expect(error.message).toBe("Rating must be greater than or equal to 1");
    }
  });

  test("should return error for rating greater than 5", async () => {
    try {
      await RatingService.createRating(mockDataWithMorerating);
    } catch (error: any) {
      expect(error).toBeInstanceOf(BadRequestExceptionError);
      expect(error.message).toBe("Rating must be less than or equal to 5");
    }
  });

  test("should return error for rating already given", async () => {
    RatingRepo.findRating = jest
      .fn()
      .mockResolvedValue({ dataValues: mockRatingData });
    try {
      await RatingService.createRating(mockRatingData);
      expect(RatingRepo.findRating).toBeCalledWith(
        mockRatingData.senderId,
        mockRatingData.receiverId,
      );
    } catch (error: any) {
      expect(error).toBeInstanceOf(BadRequestExceptionError);
      expect(error.message).toBe(Messages.ratingGiven);
    }
  });

  test("should return rating data", async () => {
    RatingRepo.findRating = jest.fn().mockResolvedValue({ dataValues: false });
    RatingRepo.createRating = jest
      .fn()
      .mockResolvedValue({ dataValues: mockRatingData });
    const response = await RatingService.createRating(mockRatingData);
    expect(RatingRepo.findRating).toBeCalled();
    expect(RatingRepo.createRating).toBeCalled();
    expect(response).toStrictEqual(mockRatingData);
  });
});
