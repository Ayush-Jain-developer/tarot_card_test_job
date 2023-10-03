"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _service_1 = require("@service");
const _exceptions_1 = require("@exceptions");
const _repo_1 = require("@repo");
const bcrypt_1 = __importDefault(require("bcrypt"));
const utils = __importStar(require("@utils"));
const _messages_1 = __importDefault(require("@messages"));
const fs_1 = __importDefault(require("fs"));
const models_1 = require("@database/models");
const _utils_1 = require("@utils");
const actualMockData = {
    email: "John@gmail.com",
    password: "12345678",
    confirmPassword: "12345678",
    firstName: "John",
    lastName: "Doe",
    role: "Reader",
};
const returnMockData = {
    id: "4d03f61c-9912-418a-8809-91fbb73ceb05",
    email: "john@gmail.com",
    password: "$2b$10$yCmy4S009zirBbstArf8d.1XveXJIfmV7xplACID.XI5n/uSMJokK",
    firstName: "John",
    lastName: "Doe",
    role: "Reader",
    stripeCusId: "cus_OifCXIoWlC5BKu",
    updatedAt: "2023-09-21T09:02:02.717Z",
    createdAt: "2023-09-21T09:02:02.717Z",
    profilePicture: null,
    deletedAt: null,
};
const returnMockDataWithProfile = {
    id: "4d03f61c-9912-418a-8809-91fbb73ceb05",
    email: "john@gmail.com",
    password: "$2b$10$yCmy4S009zirBbstArf8d.1XveXJIfmV7xplACID.XI5n/uSMJokK",
    firstName: "John",
    lastName: "Doe",
    role: "Reader",
    updatedAt: "2023-09-21T09:02:02.717Z",
    createdAt: "2023-09-21T09:02:02.717Z",
    stripeCusId: "cus_OifCXIoWlC5BKu",
    profilePicture: "https://tarotcardtestjob.s3.ap-south-1.amazonaws.com/path/to/file",
    deletedAt: null,
};
const wrongEmailMockData = {
    email: "johngmail.com",
    password: "12345678",
    confirmPassword: "12345678",
    firstName: "John",
    lastName: "Doe",
    role: "Reader",
};
const noRoleMockData = {
    email: "john@gmail.com",
    password: "12345678",
    confirmPassword: "12345678",
    firstName: "John ",
    lastName: "Doe",
    role: "",
};
const mockTokens = {
    accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRkMDNmNjFjLTk5MTItNDE4YS04O",
    refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.wvvwgwegq3r3443y66ujyteebgrtwb5yj4yg4",
};
const noPasswordMockData = {
    email: "john@gmail.com",
    password: "",
    confirmPassword: "12345678",
    firstName: "John ",
    lastName: "Doe",
    role: "Reader",
};
const shortPasswordMockData = {
    email: "john@gmail.com",
    password: "1234567",
    confirmPassword: "12345678",
    firstName: "John ",
    lastName: "Doe",
    role: "Reader",
};
const passwordUnMatchMockData = {
    email: "john@gmail.com",
    password: "12345678",
    confirmPassword: "1234567",
    firstName: "John ",
    lastName: "Doe",
    role: "Reader",
};
const actualMockDataLogin = {
    email: "john@gmail.com",
    password: "12345678",
};
const wrongEmailMockDataLogin = {
    email: "johngmail.com",
    password: "12345678",
};
const noPasswordMockDataLogin = {
    email: "john@gmail.com",
    password: "",
};
const wrongPasswordMockData = {
    email: "john@gmail.com",
    password: "1234567",
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
const mockUserDataForClient = {
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
const mockReaderBioData = {
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
const mockUnUpdatedReaderBioData = {
    id: "4d03f61c-9912-418a-8809-91fbb73ceb05",
    bio: "ebgfsbrgnbgnghdnthnghtdnhgtn",
    specialities: [],
    updatedAt: "2023-09-21T09:02:02.717Z",
    createdAt: "2023-10-21T09:02:02.717Z",
    deletedAt: null,
};
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
const mockUserDataReaderUpdate = {
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
const mockDataValue = {
    "0": {
        id: "2c0a8e0f-313f-49cc-902e-133fbce068c4",
        email: "john1@gmail.com",
        password: "$2b$10$b4KhPFXIZLSi63ZQR4f7gus5YyPaHg.0mxFa3lH1/xSeShyKH5a2.",
        profilePicture: "https://tarotcardtestjob.s3.ap-south-1.amazonaws.com/uploads/profile-1695644792575.jpg",
        firstName: "john",
        lastName: "doe",
        role: "Reader",
        createdAt: "2023-09-25T12:26:33.671Z",
        updatedAt: "2023-09-25T12:26:33.671Z",
        deletedAt: null,
    },
    "1": {
        id: "d3495e91-acc0-463d-b4a2-a76cfb683bc1",
        email: "john2@gmail.com",
        password: "$2b$10$XVkvJvRM14ZUZXvk1qQdHe99tYA38GdQboD1WyUs4tv/TMkYUSfzS",
        profilePicture: "https://tarotcardtestjob.s3.ap-south-1.amazonaws.com/uploads/profile-1695644848211.jpg",
        firstName: "john",
        lastName: "doe",
        role: "Reader",
        createdAt: "2023-09-25T12:27:29.127Z",
        updatedAt: "2023-09-25T12:27:29.127Z",
        deletedAt: null,
    },
    "2": {
        id: "261b25e0-ede4-465e-b6bc-87445ad28422",
        email: "john3@gmail.com",
        password: "$2b$10$IKnErucCMONJaIFo7ULKoeOQhnNTUWB/V190Zgwczg1.5XOwMGkUa",
        profilePicture: "https://tarotcardtestjob.s3.ap-south-1.amazonaws.com/uploads/profile-1695646798031.jpg",
        firstName: "john",
        lastName: "doe",
        role: "Reader",
        createdAt: "2023-09-25T12:59:58.825Z",
        updatedAt: "2023-09-25T12:59:58.825Z",
        deletedAt: null,
    },
    "3": {
        id: "4ad42385-3fd7-45fa-833f-1ba0c00e2f6a",
        email: "john@gmail.com",
        password: "$2b$10$BcnSi8qwmf1Q5kSftINPV..3W4Mfb.8IMzZSdfedZKF4SMXxIr5YO",
        profilePicture: "https://s3.amazonaws.com/tarotcardtestjob/uploads/profile-1695635052801.jpg",
        firstName: "john",
        lastName: "doe",
        role: "Reader",
        createdAt: "2023-09-25T09:44:13.539Z",
        updatedAt: "2023-09-25T09:44:13.539Z",
        deletedAt: null,
    },
};
const mockReaderData = {
    id: "4d03f61c-9912-418a-8809-91fbb73ceb05",
    email: "john@gmail.com",
    password: "$2b$10$yCmy4S009zirBbstArf8d.1XveXJIfmV7xplACID.XI5n/uSMJokK",
    firstName: "John",
    lastName: "Doe",
    role: "Reader",
    updatedAt: "2023-09-21T09:02:02.717Z",
    createdAt: "2023-09-21T09:02:02.717Z",
    profilePicture: null,
    deletedAt: null,
};
const mockReaderBio = {
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
const mockReaderResponse = {
    id: "4d03f61c-9912-418a-8809-91fbb73ceb05",
    email: "john@gmail.com",
    firstName: "John",
    lastName: "Doe",
    role: "Reader",
    profilePicture: null,
    bio: "Welcome to the mystical world of Tarot! I'm your trusted Tarot card reader and spiritual guide. With a deck of ancient wisdom in my hands, I unlock the secrets of your past, present, and future.",
    specialities: [
        "Career and Finance: Focusing on career decisions, financial stability, and helping clients make informed choices about their professional lives.",
        "Spiritual Guidance: Providing spiritual insight, connecting clients with their inner selves, and assisting in their spiritual journeys.",
        "Life Path and Purpose: Assisting clients in discovering their life's purpose, clarifying their goals, and aligning with their true path.",
    ],
};
const mockClientData = {
    id: "4d03f61c-9912-418a-8809-91fbb73ceb05",
    email: "john@gmail.com",
    password: "$2b$10$yCmy4S009zirBbstArf8d.1XveXJIfmV7xplACID.XI5n/uSMJokK",
    firstName: "John",
    lastName: "Doe",
    role: "Client",
    updatedAt: "2023-09-21T09:02:02.717Z",
    createdAt: "2023-09-21T09:02:02.717Z",
    profilePicture: null,
    deletedAt: null,
};
const mockClientResponse = {
    id: "4d03f61c-9912-418a-8809-91fbb73ceb05",
    email: "john@gmail.com",
    firstName: "John",
    lastName: "Doe",
    role: "Client",
    profilePicture: null,
};
describe("signUp service", () => {
    test("should return error for email", async () => {
        fs_1.default.unlinkSync = jest.fn().mockImplementation(() => true);
        try {
            const mockReq = {
                file: {
                    path: "path/to/file",
                },
            };
            await _service_1.UserService.signUp(mockReq, wrongEmailMockData);
        }
        catch (error) {
            expect(fs_1.default.unlinkSync).toBeCalledTimes(1);
            expect(fs_1.default.unlinkSync).toBeCalledWith("path/to/file");
            expect(error).toBeInstanceOf(_exceptions_1.BadRequestExceptionError);
            expect(error.message).toBe("Email must be a valid email");
        }
    });
    test("should return error for email already exist", async () => {
        const mockFindUser = jest.fn();
        _repo_1.UserRepo.findUser = mockFindUser.mockResolvedValue(returnMockData);
        fs_1.default.unlinkSync = jest.fn().mockImplementation(() => true);
        try {
            const mockReq = {
                file: {
                    path: "path/to/file",
                },
            };
            await _service_1.UserService.signUp(mockReq, actualMockData);
        }
        catch (error) {
            expect(fs_1.default.unlinkSync).toBeCalledTimes(1);
            expect(fs_1.default.unlinkSync).toBeCalledWith("path/to/file");
            expect(error).toBeInstanceOf(_exceptions_1.BadRequestExceptionError);
            expect(error.message).toBe(_messages_1.default.emailExist);
        }
    });
    test("should return error for no role", async () => {
        fs_1.default.unlinkSync = jest.fn().mockImplementation(() => true);
        try {
            const mockReq = {
                file: {
                    path: "path/to/file",
                },
            };
            await _service_1.UserService.signUp(mockReq, noRoleMockData);
        }
        catch (error) {
            expect(fs_1.default.unlinkSync).toBeCalledTimes(1);
            expect(fs_1.default.unlinkSync).toBeCalledWith("path/to/file");
            expect(error).toBeInstanceOf(_exceptions_1.BadRequestExceptionError);
            expect(error.message).toBe("Role is not allowed to be empty");
        }
    });
    test("should return error for no password", async () => {
        fs_1.default.unlinkSync = jest.fn().mockImplementation(() => true);
        try {
            const mockReq = {
                file: {
                    path: "path/to/file",
                },
            };
            await _service_1.UserService.signUp(mockReq, noPasswordMockData);
        }
        catch (error) {
            expect(fs_1.default.unlinkSync).toBeCalledTimes(1);
            expect(fs_1.default.unlinkSync).toBeCalledWith("path/to/file");
            expect(error).toBeInstanceOf(_exceptions_1.BadRequestExceptionError);
            expect(error.message).toBe("Password is not allowed to be empty");
        }
    });
    test("should return error for password length", async () => {
        fs_1.default.unlinkSync = jest.fn().mockImplementation(() => true);
        try {
            const mockReq = {
                file: {
                    path: "path/to/file",
                },
            };
            await _service_1.UserService.signUp(mockReq, shortPasswordMockData);
        }
        catch (error) {
            expect(fs_1.default.unlinkSync).toBeCalledTimes(1);
            expect(fs_1.default.unlinkSync).toBeCalledWith("path/to/file");
            expect(error).toBeInstanceOf(_exceptions_1.BadRequestExceptionError);
            expect(error.message).toBe("Password length must be at least 8 characters long");
        }
    });
    test("should return error for unmatched password and confirm password", async () => {
        fs_1.default.unlinkSync = jest.fn().mockImplementation(() => true);
        try {
            const mockReq = {
                file: {
                    path: "path/to/file",
                },
            };
            await _service_1.UserService.signUp(mockReq, passwordUnMatchMockData);
        }
        catch (error) {
            expect(fs_1.default.unlinkSync).toBeCalledTimes(1);
            expect(fs_1.default.unlinkSync).toBeCalledWith("path/to/file");
            expect(error).toBeInstanceOf(_exceptions_1.BadRequestExceptionError);
            expect(error.message).toBe(_messages_1.default.passwordNotMatch);
        }
    });
    test("should return user with profilePicture and token", async () => {
        _repo_1.UserRepo.findUser = jest.fn().mockResolvedValue(null);
        const spyCreateUser = jest.spyOn(_repo_1.UserRepo, "createUser");
        models_1.models.user.create = jest
            .fn()
            .mockResolvedValue({ dataValues: returnMockDataWithProfile });
        const spyReaderBio = jest.spyOn(_repo_1.ReaderBioRepo, "createReaderBio");
        models_1.models.readerBio.create = jest.fn().mockResolvedValue(null);
        bcrypt_1.default.genSalt = jest.fn();
        bcrypt_1.default.hash = jest
            .fn()
            .mockResolvedValue("$2b$10$yCmy4S009zirBbstArf8d.1XveXJIfmV7xplACID.XI5n/uSMJokK");
        utils.Jwt.createTokens = jest.fn().mockReturnValue(mockTokens);
        const spyUpload = jest.spyOn(utils, "uploadFile");
        fs_1.default.readFileSync = jest.fn().mockReturnValue("Mock File Data");
        fs_1.default.unlinkSync = jest.fn().mockImplementation(() => true);
        const mockReq = {
            file: {
                path: "path/to/file",
            },
        };
        _utils_1.stripe.customers.create = jest
            .fn()
            .mockImplementation(() => ({ id: "cus_OifCXIoWlC5BKu" }));
        const response = await _service_1.UserService.signUp(mockReq, actualMockData);
        expect(_repo_1.UserRepo.findUser).toHaveBeenCalledTimes(1);
        expect(spyCreateUser).toHaveBeenCalledTimes(1);
        expect(spyReaderBio).toHaveBeenCalledTimes(1);
        expect(spyUpload).toBeCalledWith("path/to/file");
        expect(fs_1.default.unlinkSync).toBeCalledTimes(1);
        expect(fs_1.default.unlinkSync).toBeCalledWith("path/to/file");
        expect(bcrypt_1.default.genSalt).toHaveBeenCalled();
        expect(bcrypt_1.default.hash).toHaveBeenCalled();
        expect(response.profilePicture).not.toBe(null);
        expect(response).toStrictEqual({
            ...returnMockDataWithProfile,
            ...mockTokens,
            refreshTokenExpiry: _messages_1.default.refreshTokenExpiry,
        });
    });
    test("should return user with token", async () => {
        _repo_1.UserRepo.findUser = jest.fn().mockResolvedValue(null);
        const spyCreateUser = jest.spyOn(_repo_1.UserRepo, "createUser");
        models_1.models.user.create = jest
            .fn()
            .mockResolvedValue({ dataValues: returnMockData });
        const spyReaderBio = jest.spyOn(_repo_1.ReaderBioRepo, "createReaderBio");
        models_1.models.readerBio.create = jest.fn().mockResolvedValue(null);
        bcrypt_1.default.genSalt = jest.fn();
        bcrypt_1.default.hash = jest
            .fn()
            .mockResolvedValue("$2b$10$yCmy4S009zirBbstArf8d.1XveXJIfmV7xplACID.XI5n/uSMJokK");
        utils.Jwt.createTokens = jest.fn().mockReturnValue(mockTokens);
        const mockReq = {};
        const spyUpload = jest.spyOn(utils, "uploadFile");
        const spyFs = jest.spyOn(fs_1.default, "readFileSync");
        _utils_1.stripe.customers.create = jest
            .fn()
            .mockImplementation(() => ({ id: "cus_OifCXIoWlC5BKu" }));
        const response = await _service_1.UserService.signUp(mockReq, actualMockData);
        expect(_repo_1.UserRepo.findUser).toBeCalledTimes(1);
        expect(spyCreateUser).toBeCalledTimes(1);
        expect(spyReaderBio).toBeCalledTimes(1);
        expect(spyUpload).not.toBeCalled();
        expect(spyFs).not.toBeCalled();
        expect(bcrypt_1.default.genSalt).toHaveBeenCalled();
        expect(bcrypt_1.default.hash).toHaveBeenCalled();
        expect(response.profilePicture).toBe(null);
        expect(response).toStrictEqual({
            ...returnMockData,
            ...mockTokens,
            refreshTokenExpiry: _messages_1.default.refreshTokenExpiry,
        });
    });
});
describe("logIn service", () => {
    test("should return error for invalid email", async () => {
        fs_1.default.unlinkSync = jest.fn().mockImplementation(() => true);
        try {
            await _service_1.UserService.logIn(wrongEmailMockDataLogin);
        }
        catch (error) {
            expect(error).toBeInstanceOf(_exceptions_1.BadRequestExceptionError);
            expect(error.message).toBe("Email must be a valid email");
        }
    });
    test("should return error for no password", async () => {
        fs_1.default.unlinkSync = jest.fn().mockImplementation(() => true);
        try {
            await _service_1.UserService.logIn(noPasswordMockDataLogin);
        }
        catch (error) {
            expect(error).toBeInstanceOf(_exceptions_1.BadRequestExceptionError);
            expect(error.message).toBe("Password is not allowed to be empty");
        }
    });
    test("should return error for no user", async () => {
        const mockFindUser = jest.fn();
        _repo_1.UserRepo.findUser = mockFindUser.mockResolvedValue(null);
        try {
            await _service_1.UserService.logIn(actualMockDataLogin);
        }
        catch (error) {
            expect(error).toBeInstanceOf(_exceptions_1.NotFoundExceptionError);
            expect(error.message).toBe(_messages_1.default.noUserExist);
        }
    });
    test("should return error for password incorrect", async () => {
        const mockFindUser = jest.fn();
        _repo_1.UserRepo.findUser = mockFindUser.mockResolvedValue({
            dataValues: mockUserData,
        });
        try {
            await _service_1.UserService.logIn(wrongPasswordMockData);
        }
        catch (error) {
            expect(error).toBeInstanceOf(_exceptions_1.UnauthorizedExceptionError);
            expect(error.message).toBe(_messages_1.default.wrongPassword);
        }
    });
    test("should return login status with token and profileUpdated status true", async () => {
        const mockFindUser = jest.fn();
        _repo_1.UserRepo.findUser = mockFindUser.mockResolvedValue({
            dataValues: mockUserData,
        });
        const spyBcrypt = jest.spyOn(bcrypt_1.default, "compare");
        const mockCreateToken = jest.fn();
        _utils_1.Jwt.createTokens = mockCreateToken.mockReturnValue(mockTokens);
        const ReaderBioMock = jest.fn();
        _repo_1.ReaderBioRepo.findReaderBioById =
            ReaderBioMock.mockResolvedValue(mockReaderBioData);
        const response = await _service_1.UserService.logIn(actualMockDataLogin);
        expect(spyBcrypt).toHaveBeenCalledTimes(1);
        expect(spyBcrypt).toHaveBeenCalledWith(actualMockDataLogin.password, mockUserData.password);
        expect(response.accessToken).toBe(mockTokens.accessToken);
        expect(response.refreshToken).toBe(mockTokens.refreshToken);
        expect(response.profileUpdated).toBe(true);
    });
    test("should return login status with token and profileUpdated status false", async () => {
        const mockFindUser = jest.fn();
        _repo_1.UserRepo.findUser = mockFindUser.mockResolvedValue({
            dataValues: mockUserData,
        });
        const spyBcrypt = jest.spyOn(bcrypt_1.default, "compare");
        const mockCreateToken = jest.fn();
        _utils_1.Jwt.createTokens = mockCreateToken.mockReturnValue(mockTokens);
        const ReaderBioMock = jest.fn();
        _repo_1.ReaderBioRepo.findReaderBioById = ReaderBioMock.mockResolvedValue(mockUnUpdatedReaderBioData);
        const response = await _service_1.UserService.logIn(actualMockDataLogin);
        expect(spyBcrypt).toHaveBeenCalledTimes(1);
        expect(spyBcrypt).toHaveBeenCalledWith(actualMockDataLogin.password, mockUserData.password);
        expect(response.accessToken).toBe(mockTokens.accessToken);
        expect(response.refreshToken).toBe(mockTokens.refreshToken);
        expect(response.profileUpdated).toBe(false);
    });
    test("should return login status with token and without profileUpdated field", async () => {
        const mockFindUser = jest.fn();
        _repo_1.UserRepo.findUser = mockFindUser.mockResolvedValue({
            dataValues: mockUserDataForClient,
        });
        const spyBcrypt = jest.spyOn(bcrypt_1.default, "compare");
        const mockCreateToken = jest.fn();
        _utils_1.Jwt.createTokens = mockCreateToken.mockReturnValue(mockTokens);
        const response = await _service_1.UserService.logIn(actualMockDataLogin);
        expect(spyBcrypt).toHaveBeenCalledTimes(1);
        expect(spyBcrypt).toHaveBeenCalledWith(actualMockDataLogin.password, mockUserDataForClient.password);
        expect(response.accessToken).toBe(mockTokens.accessToken);
        expect(response.refreshToken).toBe(mockTokens.refreshToken);
        expect(response.profileUpdated).toBeFalsy();
    });
});
describe("Reader bio service", () => {
    test("should return error for no bio", async () => {
        fs_1.default.unlinkSync = jest.fn().mockImplementation(() => true);
        try {
            await _service_1.UserService.updateReaderProfile(noBioMockData);
        }
        catch (error) {
            expect(error).toBeInstanceOf(_exceptions_1.BadRequestExceptionError);
            expect(error.message).toBe("Bio is not allowed to be empty");
        }
    });
    test("should return error for no specialities", async () => {
        fs_1.default.unlinkSync = jest.fn().mockImplementation(() => true);
        try {
            await _service_1.UserService.updateReaderProfile(noSpecialitiesMockData);
        }
        catch (error) {
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
            await _service_1.UserService.updateReaderProfile(mockDataForUpdate);
        }
        catch (error) {
            expect(error).toBeInstanceOf(_exceptions_1.UnauthorizedExceptionError);
            expect(error.message).toBe(_messages_1.default.wrongUserRole);
        }
    });
    test("should return updated reader profile", async () => {
        const mockFindUserById = jest.fn();
        _repo_1.UserRepo.findUserByID = mockFindUserById.mockResolvedValue({
            dataValues: mockUserDataReaderUpdate,
        });
        const mockUpdateReaderProfile = jest.fn();
        _repo_1.ReaderBioRepo.updateReaderProfile =
            mockUpdateReaderProfile.mockResolvedValue(updatedMockData);
        const response = await _service_1.UserService.updateReaderProfile(mockDataForUpdate);
        expect(response).toStrictEqual(updatedMockData);
    });
});
describe("Reader paginated service", () => {
    test("should return error for no page number", async () => {
        try {
            await _service_1.UserService.getAllReaders(NaN, 10);
        }
        catch (error) {
            expect(error).toBeInstanceOf(_exceptions_1.BadRequestExceptionError);
            expect(error.message).toBe("Page number must be a number");
        }
    });
    test("should return error for no page size", async () => {
        try {
            await _service_1.UserService.getAllReaders(10, NaN);
        }
        catch (error) {
            expect(error).toBeInstanceOf(_exceptions_1.BadRequestExceptionError);
            expect(error.message).toBe("Page size must be a number");
        }
    });
    test("should return error for non integer page number", async () => {
        try {
            await _service_1.UserService.getAllReaders(10.9, 10);
        }
        catch (error) {
            expect(error).toBeInstanceOf(_exceptions_1.BadRequestExceptionError);
            expect(error.message).toBe("Page number must be an integer");
        }
    });
    test("should return error for non integer page size", async () => {
        try {
            await _service_1.UserService.getAllReaders(10, 10.9);
        }
        catch (error) {
            expect(error).toBeInstanceOf(_exceptions_1.BadRequestExceptionError);
            expect(error.message).toBe("Page size must be an integer");
        }
    });
    test("should return error for zero page number", async () => {
        try {
            await _service_1.UserService.getAllReaders(0, 10);
        }
        catch (error) {
            expect(error).toBeInstanceOf(_exceptions_1.BadRequestExceptionError);
            expect(error.message).toBe("Page number must be greater than or equal to 1");
        }
    });
    test("should return error for zero page size", async () => {
        try {
            await _service_1.UserService.getAllReaders(10, 0);
        }
        catch (error) {
            expect(error).toBeInstanceOf(_exceptions_1.BadRequestExceptionError);
            expect(error.message).toBe("Page size must be greater than or equal to 1");
        }
    });
    test("should return reader data", async () => {
        const spyCount = jest.spyOn(_repo_1.UserRepo, "countAllReaders");
        models_1.models.user.findAndCountAll = jest.fn().mockResolvedValue({ count: 4 });
        const spyData = jest.spyOn(_repo_1.UserRepo, "getPaginatedReaders");
        models_1.models.user.findAll = jest.fn().mockResolvedValue(mockDataValue);
        const response = await _service_1.UserService.getAllReaders(1, 4);
        expect(spyCount).toBeCalledTimes(1);
        expect(models_1.models.user.findAndCountAll).toBeCalledWith({
            where: {
                role: "Reader",
            },
        });
        expect(spyData).toHaveBeenCalledTimes(1);
        expect(models_1.models.user.findAll).toBeCalledWith({
            where: {
                role: "Reader",
            },
            order: [["email", "ASC"]],
            offset: 0,
            limit: 4,
        });
        expect(response).toStrictEqual({
            ...mockDataValue,
            meta: {
                totalPages: 1,
                currentPage: 1,
                previousPage: null,
                nextPage: null,
                pageSize: 4,
            },
        });
    });
});
describe("user API", () => {
    test("should return error for no such user", async () => {
        const mockUser = jest.fn();
        _repo_1.UserRepo.findUserByID = mockUser.mockResolvedValue(null);
        try {
            await _service_1.UserService.getUser("123");
        }
        catch (error) {
            expect(error).toBeInstanceOf(_exceptions_1.BadRequestExceptionError);
            expect(error.message).toBe(_messages_1.default.noUserExist);
        }
    });
    test("should return data for Reader", async () => {
        const mockUser = jest.fn();
        _repo_1.UserRepo.findUserByID = mockUser.mockResolvedValue({
            dataValues: mockReaderData,
        });
        const mockBio = jest.fn();
        _repo_1.ReaderBioRepo.findReaderBioById = mockBio.mockResolvedValue({
            dataValues: mockReaderBio,
        });
        const response = await _service_1.UserService.getUser("4d03f61c-9912-418a-8809-91fbb73ceb05");
        expect(response.id).toBe("4d03f61c-9912-418a-8809-91fbb73ceb05");
        expect(response).toStrictEqual(mockReaderResponse);
    });
    test("should return data for client", async () => {
        const mockUser = jest.fn();
        _repo_1.UserRepo.findUserByID = mockUser.mockResolvedValue({
            dataValues: mockClientData,
        });
        const response = await _service_1.UserService.getUser("4d03f61c-9912-418a-8809-91fbb73ceb05");
        expect(response.id).toBe("4d03f61c-9912-418a-8809-91fbb73ceb05");
        expect(response).toStrictEqual(mockClientResponse);
    });
});
