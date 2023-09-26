"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _validations_1 = __importDefault(require("@validations"));
const _repo_1 = require("@repo");
class RatingService {
    static async createRating(req, data) {
        _validations_1.default.stringRequired(req, data.senderId, "Sender ID");
        _validations_1.default.stringRequired(req, data.receiverId, "Receiver ID");
        _validations_1.default.integerRequired(data.rating, "Rating");
        const response = await _repo_1.RatingRepo.createRating(data);
        return response.dataValues;
    }
}
exports.default = RatingService;
