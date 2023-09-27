"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _validations_1 = __importDefault(require("@validations"));
const _repo_1 = require("@repo");
const _exceptions_1 = require("@exceptions");
const _messages_1 = __importDefault(require("@messages"));
class RatingService {
    static async createRating(data) {
        _validations_1.default.stringRequired(data.senderId, "Sender ID");
        if (data.id !== data.senderId) {
            throw new _exceptions_1.UnauthorizedExceptionError(_messages_1.default.invalidToken);
        }
        _validations_1.default.stringRequired(data.receiverId, "Receiver ID");
        _validations_1.default.integerRequired(data.rating, "Rating");
        const rating = await _repo_1.RatingRepo.findRating(data.senderId, data.receiverId);
        if (rating?.dataValues) {
            throw new _exceptions_1.BadRequestExceptionError(_messages_1.default.ratingGiven);
        }
        const response = await _repo_1.RatingRepo.createRating(data);
        return response.dataValues;
    }
}
exports.default = RatingService;
