"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _service_1 = __importDefault(require("@service"));
const _exceptions_1 = require("@exceptions");
const _repo_1 = require("@repo");
const _utils_1 = __importDefault(require("@utils"));
const actualMockData = {
    email: "john@gmail.com",
    password: "12345678",
};
const wrongEmailMockData = {
    email: "johngmail.com",
    password: "12345678",
};
const noPasswordMockData = {
    email: "john@gmail.com",
    password: "",
};
const wrongPasswordMockData = {
    email: "john@gmail.com",
    password: "1234567",
};
const mockToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRkMDNmNjFjLTk5MTItNDE4YS04O";
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
describe("logIn API", () => {
    test("should return error for invalid email", async () => {
        try {
            await _service_1.default.logIn(wrongEmailMockData);
        }
        catch (error) {
            expect(error).toBeInstanceOf(_exceptions_1.BadRequestExceptionError);
            expect(error.message).toBe("Email must be a valid email");
        }
    });
    test("should return error for no password", async () => {
        try {
            await _service_1.default.logIn(noPasswordMockData);
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
            await _service_1.default.logIn(actualMockData);
        }
        catch (error) {
            expect(error).toBeInstanceOf(_exceptions_1.NotFoundExceptionError);
            expect(error.message).toBe("User not found. Please signUp");
        }
    });
    test("should return error for password incorrect", async () => {
        const mockFindUser = jest.fn();
        _repo_1.UserRepo.findUser = mockFindUser.mockResolvedValue({
            dataValues: mockUserData,
        });
        try {
            await _service_1.default.logIn(wrongPasswordMockData);
        }
        catch (error) {
            expect(error).toBeInstanceOf(_exceptions_1.UnauthorizedExceptionError);
            expect(error.message).toBe("Password incorrect");
        }
    });
    test("should return login status with token", async () => {
        const mockFindUser = jest.fn();
        _repo_1.UserRepo.findUser = mockFindUser.mockResolvedValue({
            dataValues: mockUserData,
        });
        const mockCreateToken = jest.fn();
        _utils_1.default.createToken = mockCreateToken.mockReturnValue(mockToken);
        const response = await _service_1.default.logIn(actualMockData);
        expect(response.token).toBe(mockToken);
    });
});
