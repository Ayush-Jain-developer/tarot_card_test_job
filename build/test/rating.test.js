"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _exceptions_1 = require("@exceptions");
const _messages_1 = __importDefault(require("@messages"));
const _repo_1 = require("@repo");
const _service_1 = require("@service");
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
            await _service_1.RatingService.createRating(mockDataWithNoSenderId);
        }
        catch (error) {
            expect(error).toBeInstanceOf(_exceptions_1.BadRequestExceptionError);
            expect(error.message).toBe("Sender ID is not allowed to be empty");
        }
    });
    test("should return error for mismatched id and senderId", async () => {
        try {
            await _service_1.RatingService.createRating(mockDataMisMatchedIdAndSenderId);
        }
        catch (error) {
            expect(error).toBeInstanceOf(_exceptions_1.UnauthorizedExceptionError);
            expect(error.message).toBe(_messages_1.default.invalidToken);
        }
    });
    test("should return error for no receiver id", async () => {
        try {
            await _service_1.RatingService.createRating(mockDataWithNoReceiverId);
        }
        catch (error) {
            expect(error).toBeInstanceOf(_exceptions_1.BadRequestExceptionError);
            expect(error.message).toBe("Receiver ID is not allowed to be empty");
        }
    });
    test("should return error for rating less than 1", async () => {
        try {
            await _service_1.RatingService.createRating(mockDataWithLessrating);
        }
        catch (error) {
            expect(error).toBeInstanceOf(_exceptions_1.BadRequestExceptionError);
            expect(error.message).toBe("Rating must be greater than or equal to 1");
        }
    });
    test("should return error for rating greater than 5", async () => {
        try {
            await _service_1.RatingService.createRating(mockDataWithMorerating);
        }
        catch (error) {
            expect(error).toBeInstanceOf(_exceptions_1.BadRequestExceptionError);
            expect(error.message).toBe("Rating must be less than or equal to 5");
        }
    });
    // test("should return error for rating already given", async () => {
    //   RatingRepo.findRating = jest
    //     .fn()
    //     .mockResolvedValue({ dataValues: mockRatingFindData });
    //   try {
    //     await RatingService.createRating(mockRatingData);
    //   } catch (error: any) {
    //     expect(RatingRepo.findRating).toBeCalledTimes(1);
    //     expect(RatingRepo.findRating).toBeCalledWith(
    //       mockRatingData.senderId,
    //       mockRatingData.receiverId,
    //     );
    //     expect(error).toBeInstanceOf(BadRequestExceptionError);
    //     expect(error.message).toBe(Messages.ratingGiven);
    //   }
    // });
    test("should return rating data", async () => {
        _repo_1.RatingRepo.createRating = jest
            .fn()
            .mockResolvedValue({ dataValues: mockRatingData });
        const response = await _service_1.RatingService.createRating(mockRatingData);
        expect(response).toStrictEqual(mockRatingData);
    });
});
