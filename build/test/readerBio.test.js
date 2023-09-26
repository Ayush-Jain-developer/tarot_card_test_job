"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _service_1 = require("@service");
const _repo_1 = require("@repo");
const _exceptions_1 = require("@exceptions");
const _messages_1 = __importDefault(require("@messages"));
const fs_1 = __importDefault(require("fs"));
const mockWrongRoleUserData = {
    id: "4d03f61c-9912-418a-8809-91fbb73ceb05",
    email: "john@gmail.com",
    password: "$2b$10$yCmy4S009zirBbstArf8d.1XveXJIfmV7xplACID.XI5n/uSMJokK",
    firstName: "John ",
    lastName: "Doe",
    role: "Client",
    updatedAt: "2023-09-21T09:02:02.717Z",
    createdAt: "2023-09-21T09:02:02.717Z",
    profilePicture: null,
    deletedAt: null,
};
const mockUserData = {
    id: "4d03f61c-9912-418a-8809-91fbb73ceb05",
    email: "john@gmail.com",
    password: "$2b$10$yCmy4S009zirBbstArf8d.1XveXJIfmV7xplACID.XI5n/uSMJokK",
    firstName: "John ",
    lastName: "Doe",
    role: "Reader",
    updatedAt: "2023-09-21T09:02:02.717Z",
    createdAt: "2023-09-21T09:02:02.717Z",
    profilePicture: null,
    deletedAt: null,
};
const mockDataForUpdate = {
    id: "4d03f61c-9912-418a-8809-91fbb73ceb05",
    bio: "Welcome to the mystical world of Tarot! I'm your trusted Tarot card reader and spiritual guide. With a deck of ancient wisdom in my hands, I unlock the secrets of your past, present, and future.",
    specialities: [
        "Career and Finance: Focusing on career decisions, financial stability, and helping clients make informed choices about their professional lives.",
        "Spiritual Guidance: Providing spiritual insight, connecting clients with their inner selves, and assisting in their spiritual journeys.",
        "Life Path and Purpose: Assisting clients in discovering their life's purpose, clarifying their goals, and aligning with their true path.",
    ],
};
const updatedMockData = {
    id: "4d03f61c-9912-418a-8809-91fbb73ceb05",
    bio: "Welcome to the mystical world of Tarot! I'm your trusted Tarot card reader and spiritual guide. With a deck of ancient wisdom in my hands, I unlock the secrets of your past, present, and future.",
    specialities: [
        "Career and Finance: Focusing on career decisions, financial stability, and helping clients make informed choices about their professional lives.",
        "Spiritual Guidance: Providing spiritual insight, connecting clients with their inner selves, and assisting in their spiritual journeys.",
        "Life Path and Purpose: Assisting clients in discovering their life's purpose, clarifying their goals, and aligning with their true path.",
    ],
    updatedAt: "2023-09-21T09:02:02.717Z",
    createdAt: "2023-10-21T09:02:02.717Z",
    deletedAt: null,
};
const noBioMockData = {
    id: "4d03f61c-9912-418a-8809-91fbb73ceb05",
    bio: "",
    specialities: [
        "Career and Finance: Focusing on career decisions, financial stability, and helping clients make informed choices about their professional lives.",
        "Spiritual Guidance: Providing spiritual insight, connecting clients with their inner selves, and assisting in their spiritual journeys.",
        "Life Path and Purpose: Assisting clients in discovering their life's purpose, clarifying their goals, and aligning with their true path.",
    ],
};
const noSpecialitiesMockData = {
    id: "4d03f61c-9912-418a-8809-91fbb73ceb05",
    bio: "Welcome to the mystical world of Tarot! I'm your trusted Tarot card reader and spiritual guide. With a deck of ancient wisdom in my hands, I unlock the secrets of your past, present, and future.",
    specialities: [],
};
describe("Reader bio API", () => {
    test("should return error for no bio", async () => {
        fs_1.default.unlinkSync = jest.fn().mockImplementation(() => true);
        try {
            const mockReq = {};
            await _service_1.UserService.updateReaderProfile(mockReq, noBioMockData);
        }
        catch (error) {
            expect(fs_1.default.unlinkSync).not.toBeCalled();
            expect(error).toBeInstanceOf(_exceptions_1.BadRequestExceptionError);
            expect(error.message).toBe("Bio is not allowed to be empty");
        }
    });
    test("should return error for no specialities", async () => {
        fs_1.default.unlinkSync = jest.fn().mockImplementation(() => true);
        try {
            const mockReq = {};
            await _service_1.UserService.updateReaderProfile(mockReq, noSpecialitiesMockData);
        }
        catch (error) {
            expect(fs_1.default.unlinkSync).not.toBeCalled();
            expect(error).toBeInstanceOf(_exceptions_1.BadRequestExceptionError);
            expect(error.message).toBe("Specialities must contain at least 1 items");
        }
    });
    test("should return error for wrong user role", async () => {
        const mockFindUserById = jest.fn();
        _repo_1.UserRepo.findUserByID = mockFindUserById.mockResolvedValue({
            dataValues: mockWrongRoleUserData,
        });
        try {
            const mockReq = {};
            await _service_1.UserService.updateReaderProfile(mockReq, mockDataForUpdate);
        }
        catch (error) {
            expect(error).toBeInstanceOf(_exceptions_1.UnauthorizedExceptionError);
            expect(error.message).toBe(_messages_1.default.wrongUserRole);
        }
    });
    test("should return updated reader profile", async () => {
        const mockFindUserById = jest.fn();
        _repo_1.UserRepo.findUserByID = mockFindUserById.mockResolvedValue({
            dataValues: mockUserData,
        });
        const mockUpdateReaderProfile = jest.fn();
        _repo_1.ReaderBioRepo.updateReaderProfile =
            mockUpdateReaderProfile.mockResolvedValue(updatedMockData);
        const mockReq = {};
        const response = await _service_1.UserService.updateReaderProfile(mockReq, mockDataForUpdate);
        expect(response).toStrictEqual(updatedMockData);
    });
});
