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
const _service_1 = __importDefault(require("@service"));
const _exceptions_1 = require("@exceptions");
const _repo_1 = require("@repo");
const bcrypt_1 = __importDefault(require("bcrypt"));
const utils = __importStar(require("@utils"));
const _messages_1 = __importDefault(require("@messages"));
const fs_1 = __importDefault(require("fs"));
const actualMockData = {
    email: "john@gmail.com",
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
describe("signUp API", () => {
    test("should return error for email", async () => {
        fs_1.default.unlinkSync = jest.fn().mockImplementation(() => true);
        try {
            const mockReq = {
                file: {
                    path: "path/to/file",
                },
            };
            await _service_1.default.signUp(mockReq, wrongEmailMockData);
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
            await _service_1.default.signUp(mockReq, actualMockData);
        }
        catch (error) {
            expect(fs_1.default.unlinkSync).toBeCalledTimes(1);
            expect(fs_1.default.unlinkSync).toBeCalledWith("path/to/file");
            expect(error).toBeInstanceOf(_exceptions_1.BadRequestExceptionError);
            expect(error.message).toBe(_messages_1.default.emailExist);
        }
    });
    test("should return error for no role", async () => {
        const mockFindUser = jest.fn();
        _repo_1.UserRepo.findUser = mockFindUser.mockResolvedValue(null);
        fs_1.default.unlinkSync = jest.fn().mockImplementation(() => true);
        try {
            const mockReq = {
                file: {
                    path: "path/to/file",
                },
            };
            await _service_1.default.signUp(mockReq, noRoleMockData);
        }
        catch (error) {
            expect(fs_1.default.unlinkSync).toBeCalledTimes(1);
            expect(fs_1.default.unlinkSync).toBeCalledWith("path/to/file");
            expect(error).toBeInstanceOf(_exceptions_1.BadRequestExceptionError);
            expect(error.message).toBe("Role is not allowed to be empty");
        }
    });
    test("should return error for no password", async () => {
        const mockFindUser = jest.fn();
        _repo_1.UserRepo.findUser = mockFindUser.mockResolvedValue(null);
        fs_1.default.unlinkSync = jest.fn().mockImplementation(() => true);
        try {
            const mockReq = {
                file: {
                    path: "path/to/file",
                },
            };
            await _service_1.default.signUp(mockReq, noPasswordMockData);
        }
        catch (error) {
            expect(fs_1.default.unlinkSync).toBeCalledTimes(1);
            expect(fs_1.default.unlinkSync).toBeCalledWith("path/to/file");
            expect(error).toBeInstanceOf(_exceptions_1.BadRequestExceptionError);
            expect(error.message).toBe("Password is not allowed to be empty");
        }
    });
    test("should return error for password length", async () => {
        const mockFindUser = jest.fn();
        _repo_1.UserRepo.findUser = mockFindUser.mockResolvedValue(null);
        fs_1.default.unlinkSync = jest.fn().mockImplementation(() => true);
        try {
            const mockReq = {
                file: {
                    path: "path/to/file",
                },
            };
            await _service_1.default.signUp(mockReq, shortPasswordMockData);
        }
        catch (error) {
            expect(fs_1.default.unlinkSync).toBeCalledTimes(1);
            expect(fs_1.default.unlinkSync).toBeCalledWith("path/to/file");
            expect(error).toBeInstanceOf(_exceptions_1.BadRequestExceptionError);
            expect(error.message).toBe("Password length must be at least 8 characters long");
        }
    });
    test("should return error for unmatched password and confirm password", async () => {
        const mockFindUser = jest.fn();
        _repo_1.UserRepo.findUser = mockFindUser.mockResolvedValue(null);
        fs_1.default.unlinkSync = jest.fn().mockImplementation(() => true);
        try {
            const mockReq = {
                file: {
                    path: "path/to/file",
                },
            };
            await _service_1.default.signUp(mockReq, passwordUnMatchMockData);
        }
        catch (error) {
            expect(fs_1.default.unlinkSync).toBeCalledTimes(1);
            expect(fs_1.default.unlinkSync).toBeCalledWith("path/to/file");
            expect(error).toBeInstanceOf(_exceptions_1.BadRequestExceptionError);
            expect(error.message).toBe(_messages_1.default.passwordNotMatch);
        }
    });
    beforeEach(() => { });
    test("should return user with profilePicture and token", async () => {
        const mockFindUser = jest.fn();
        _repo_1.UserRepo.findUser = mockFindUser.mockResolvedValue(null);
        const mockCreateUser = jest.fn();
        _repo_1.UserRepo.createUser = mockCreateUser.mockResolvedValue({
            dataValues: returnMockData,
        });
        const mockCreateReaderBio = jest.fn();
        _repo_1.ReaderBioRepo.createReaderBio = mockCreateReaderBio.mockResolvedValue(null);
        bcrypt_1.default.genSalt = jest.fn();
        bcrypt_1.default.hash = jest.fn();
        utils.Jwt.createTokens = jest.fn().mockReturnValue(mockTokens);
        const spyUpload = jest.spyOn(utils, "uploadFile");
        fs_1.default.readFileSync = jest.fn().mockImplementation(() => "Mock File Data");
        fs_1.default.unlinkSync = jest.fn().mockImplementation(() => true);
        const mockReq = {
            file: {
                path: "path/to/file",
            },
        };
        const response = await _service_1.default.signUp(mockReq, actualMockData);
        expect(spyUpload).toBeCalledTimes(1);
        expect(spyUpload).toBeCalledWith("path/to/file");
        expect(fs_1.default.readFileSync).toBeCalled();
        expect(fs_1.default.readFileSync).toBeCalledWith("path/to/file");
        expect(fs_1.default.unlinkSync).toBeCalledTimes(1);
        expect(fs_1.default.unlinkSync).toBeCalledWith("path/to/file");
        expect(bcrypt_1.default.genSalt).toHaveBeenCalled();
        expect(bcrypt_1.default.hash).toHaveBeenCalled();
        expect(_repo_1.ReaderBioRepo.createReaderBio).toHaveBeenCalled();
        expect(response.profilePicture).toBe(null);
        expect(response).toStrictEqual({
            ...returnMockDataWithProfile,
            ...mockTokens,
            refreshTokenExpiry: _messages_1.default.refreshTokenExpiry,
        });
    });
    test("should return user with token", async () => {
        const mockFindUser = jest.fn();
        _repo_1.UserRepo.findUser = mockFindUser.mockResolvedValue(null);
        const mockCreateUser = jest.fn();
        _repo_1.UserRepo.createUser = mockCreateUser.mockResolvedValue({
            dataValues: returnMockData,
        });
        const mockCreateReaderBio = jest.fn();
        _repo_1.ReaderBioRepo.createReaderBio = mockCreateReaderBio.mockResolvedValue(null);
        bcrypt_1.default.genSalt = jest.fn();
        bcrypt_1.default.hash = jest.fn();
        utils.Jwt.createTokens = jest.fn().mockReturnValue(mockTokens);
        const mockReq = {};
        const spyUpload = jest.spyOn(utils, "uploadFile");
        const spyFs = jest.spyOn(fs_1.default, "readFileSync");
        const response = await _service_1.default.signUp(mockReq, actualMockData);
        expect(spyUpload).not.toBeCalled();
        expect(spyFs).not.toBeCalled();
        expect(bcrypt_1.default.genSalt).toHaveBeenCalled();
        expect(bcrypt_1.default.hash).toHaveBeenCalled();
        expect(_repo_1.ReaderBioRepo.createReaderBio).toHaveBeenCalled();
        expect(response.profilePicture).toBe(null);
        expect(response).toStrictEqual({
            ...returnMockData,
            ...mockTokens,
            refreshTokenExpiry: _messages_1.default.refreshTokenExpiry,
        });
    });
});
