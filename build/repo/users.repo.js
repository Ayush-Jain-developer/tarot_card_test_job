"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepo = void 0;
const models_1 = require("@database/models");
class UserRepo {
    static async createUser(data) {
        return models_1.models.user.create(data);
    }
    static async findUser(email) {
        return models_1.models.user.findOne({
            where: {
                email: email
            }
        });
    }
}
exports.UserRepo = UserRepo;