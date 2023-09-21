"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _service_1 = __importDefault(require("@service"));
const _exceptions_1 = require("@exceptions");
const _repo_1 = require("@repo");
const bcrypt_1 = __importDefault(require("bcrypt"));
const _utils_1 = __importDefault(require("@utils"));
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
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRkMDNmNjFjLTk5MTItNDE4YS04O";
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
        try {
            await _service_1.default.signUp(wrongEmailMockData);
        }
        catch (error) {
            expect(error).toBeInstanceOf(_exceptions_1.BadRequestExceptionError);
            expect(error.message).toBe("Email must be a valid email");
        }
    });
    test("should return error for email already exist", async () => {
        const mockFindUser = jest.fn();
        _repo_1.UserRepo.findUser = mockFindUser.mockResolvedValue(returnMockData);
        try {
            await _service_1.default.signUp(actualMockData);
        }
        catch (error) {
            expect(error).toBeInstanceOf(_exceptions_1.BadRequestExceptionError);
            expect(error.message).toBe("Email already exists");
        }
    });
    test("should return error for no role", async () => {
        const mockFindUser = jest.fn();
        _repo_1.UserRepo.findUser = mockFindUser.mockResolvedValue(null);
        try {
            await _service_1.default.signUp(noRoleMockData);
        }
        catch (error) {
            expect(error).toBeInstanceOf(_exceptions_1.BadRequestExceptionError);
            expect(error.message).toBe("Role is not allowed to be empty");
        }
    });
    test("should return error for no password", async () => {
        const mockFindUser = jest.fn();
        _repo_1.UserRepo.findUser = mockFindUser.mockResolvedValue(null);
        try {
            await _service_1.default.signUp(noPasswordMockData);
        }
        catch (error) {
            expect(error).toBeInstanceOf(_exceptions_1.BadRequestExceptionError);
            expect(error.message).toBe("Password is not allowed to be empty");
        }
    });
    test("should return error for password length", async () => {
        const mockFindUser = jest.fn();
        _repo_1.UserRepo.findUser = mockFindUser.mockResolvedValue(null);
        try {
            await _service_1.default.signUp(shortPasswordMockData);
        }
        catch (error) {
            expect(error).toBeInstanceOf(_exceptions_1.BadRequestExceptionError);
            expect(error.message).toBe("Password length must be at least 8 characters long");
        }
    });
    test("should return error for unmatched password and confirm password", async () => {
        const mockFindUser = jest.fn();
        _repo_1.UserRepo.findUser = mockFindUser.mockResolvedValue(null);
        try {
            await _service_1.default.signUp(passwordUnMatchMockData);
        }
        catch (error) {
            expect(error).toBeInstanceOf(_exceptions_1.BadRequestExceptionError);
            expect(error.message).toBe("Password and Confirm Password do not match");
        }
    });
    test("should return user and token", async () => {
        const mockFindUser = jest.fn();
        _repo_1.UserRepo.findUser = mockFindUser.mockResolvedValue(null);
        const mockCreateUser = jest.fn();
        _repo_1.UserRepo.createUser = mockCreateUser.mockResolvedValue({
            dataValues: returnMockData,
        });
        const mockCreateReaderBio = jest.fn();
        _repo_1.ReaderBioRepo.createReaderBio = mockCreateReaderBio.mockResolvedValue(null);
        const mockCreateToken = jest.fn();
        _utils_1.default.createToken = mockCreateToken.mockReturnValue(token);
        bcrypt_1.default.genSalt = jest.fn();
        bcrypt_1.default.hash = jest.fn();
        const response = await _service_1.default.signUp(actualMockData);
        expect(bcrypt_1.default.genSalt).toHaveBeenCalled();
        expect(bcrypt_1.default.hash).toHaveBeenCalled();
        expect(_repo_1.ReaderBioRepo.createReaderBio).toHaveBeenCalled();
        expect(response).toStrictEqual({ ...returnMockData, token });
    });
});
