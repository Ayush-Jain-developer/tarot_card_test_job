"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("@database/models");
class UserRepo {
    static async createUser(data) {
        return models_1.models.user.create(data);
    }
    static async findUser(email) {
        return models_1.models.user.findOne({
            where: {
                email,
            },
        });
    }
    static async findUserByID(id) {
        return models_1.models.user.findByPk(id);
    }
    static async countAllReaders() {
        return models_1.models.user.findAndCountAll({
            where: {
                role: "Reader",
            },
        });
    }
    static async getPaginatedReaders(offset, limit) {
        return models_1.models.user.findAll({
            where: {
                role: "Reader",
            },
            order: [["email", "ASC"]],
            offset,
            limit,
        });
    }
}
exports.default = UserRepo;
