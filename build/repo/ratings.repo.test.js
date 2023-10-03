"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("@database/models");
const ratings_repo_1 = __importDefault(require("./ratings.repo"));
const mockCreateRatingData = {
    senderId: "4d03f61c-9912-418a-8809-91fbb73ceb05",
    receiverId: "4d03f61c-9912-418a-8809-91fbb73ceb04",
    rating: 3,
};
describe("Rating repo", () => {
    test("should create rating", async () => {
        models_1.models.ratings.create = jest.fn().mockImplementation(() => "Rating");
        const result = await ratings_repo_1.default.createRating(mockCreateRatingData);
        expect(models_1.models.ratings.create).toBeCalledWith(mockCreateRatingData);
        expect(result).toBe("Rating");
    });
    test("should find rating", async () => {
        models_1.models.ratings.findOne = jest.fn().mockResolvedValue("Rating");
        const result = await ratings_repo_1.default.findRating(mockCreateRatingData.senderId, mockCreateRatingData.receiverId);
        expect(models_1.models.ratings.findOne).toBeCalledWith({
            where: {
                senderId: mockCreateRatingData.senderId,
                receiverId: mockCreateRatingData.receiverId,
            },
        });
        expect(result).toBe("Rating");
    });
});
