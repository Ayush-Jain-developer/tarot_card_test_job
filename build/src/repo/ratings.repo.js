"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("@database/models");
class RatingRepo {
    static createRating(data) {
        return models_1.models.ratings.create(data);
    }
    static findRating(senderId, receiverId) {
        return models_1.models.ratings.findOne({
            where: {
                senderId,
                receiverId,
            },
        });
    }
}
exports.default = RatingRepo;
