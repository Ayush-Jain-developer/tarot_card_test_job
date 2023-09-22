"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("@database/models");
class ReaderBioRepo {
    static async createReaderBio(data) {
        return models_1.models.readerBio.create(data);
    }
    static async findReaderBioById(id) {
        return models_1.models.readerBio.findByPk(id);
    }
    static async updateReaderProfile(data) {
        return models_1.models.readerBio.update({
            bio: data.bio,
            specialities: data.specialities,
        }, {
            where: {
                id: data.id,
            },
            returning: true,
        });
    }
}
exports.default = ReaderBioRepo;
