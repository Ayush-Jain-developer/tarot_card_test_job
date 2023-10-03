"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("@database/models");
const readerProfile_repo_1 = __importDefault(require("./readerProfile.repo"));
const mockDataForUpdate = {
    id: "4d03f61c-9912-418a-8809-91fbb73ceb05",
    bio: "Welcome to the mystical world of Tarot! I'm your trusted Tarot card reader and spiritual guide. With a deck of ancient wisdom in my hands, I unlock the secrets of your past, present, and future.",
    specialities: [
        "Career and Finance: Focusing on career decisions, financial stability, and helping clients make informed choices about their professional lives.",
        "Spiritual Guidance: Providing spiritual insight, connecting clients with their inner selves, and assisting in their spiritual journeys.",
        "Life Path and Purpose: Assisting clients in discovering their life's purpose, clarifying their goals, and aligning with their true path.",
    ],
};
describe("ReaderProfile Repo", () => {
    test("should create reader bio", async () => {
        models_1.models.readerBio.create = jest.fn().mockImplementation(() => "Bio");
        const result = await readerProfile_repo_1.default.createReaderBio({
            id: "4d03f61c-9912-418a-8809-91fbb73ceb05",
        });
        expect(models_1.models.readerBio.create).toBeCalledWith({
            id: "4d03f61c-9912-418a-8809-91fbb73ceb05",
        });
        expect(result).toBe("Bio");
    });
    test("should find reader bio by ID", async () => {
        models_1.models.readerBio.findByPk = jest.fn().mockResolvedValue("Bio");
        const result = await readerProfile_repo_1.default.findReaderBioById("4d03f61c-9912-418a-8809-91fbb73ceb05");
        expect(models_1.models.readerBio.findByPk).toBeCalledWith("4d03f61c-9912-418a-8809-91fbb73ceb05");
        expect(result).toBe("Bio");
    });
    test("should update reader profile", async () => {
        models_1.models.readerBio.update = jest.fn().mockResolvedValue("Updated");
        const result = await readerProfile_repo_1.default.updateReaderProfile(mockDataForUpdate);
        expect(models_1.models.readerBio.update).toBeCalledWith({
            bio: mockDataForUpdate.bio,
            specialities: mockDataForUpdate.specialities,
        }, {
            where: {
                id: mockDataForUpdate.id,
            },
            returning: true,
        });
        expect(result).toBe("Updated");
    });
});
