"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("@database/models");
const users_repo_1 = __importDefault(require("./users.repo"));
const mockUserData = {
    email: "John@gmail.com",
    password: "12345678",
    confirmPassword: "12345678",
    firstName: "John",
    lastName: "Doe",
    role: "Reader",
};
describe("User repo", () => {
    test("should create new user", async () => {
        models_1.models.user.create = jest.fn().mockImplementation(() => "User");
        const result = await users_repo_1.default.createUser(mockUserData);
        expect(models_1.models.user.create).toBeCalledWith(mockUserData);
        expect(result).toBe("User");
    });
    test("should find user", async () => {
        models_1.models.user.findOne = jest.fn().mockResolvedValue("User");
        const result = await users_repo_1.default.findUser(mockUserData.email);
        expect(models_1.models.user.findOne).toBeCalledWith({
            where: { email: mockUserData.email },
        });
        expect(result).toBe("User");
    });
    test("should find user by ID", async () => {
        models_1.models.user.findByPk = jest.fn().mockResolvedValue("User");
        const result = await users_repo_1.default.findUserByID("4d03f61c-9912-418a-8809-91fbb73ceb05");
        expect(models_1.models.user.findByPk).toBeCalledWith("4d03f61c-9912-418a-8809-91fbb73ceb05");
        expect(result).toBe("User");
    });
    test("should find and count all users", async () => {
        models_1.models.user.findAndCountAll = jest.fn().mockResolvedValue(10);
        const result = await users_repo_1.default.countAllReaders();
        expect(models_1.models.user.findAndCountAll).toBeCalledWith({
            where: {
                role: "Reader",
            },
        });
        expect(result).toBe(10);
    });
    test("should get paginated users", async () => {
        models_1.models.user.findAll = jest.fn().mockResolvedValue("Users");
        const result = await users_repo_1.default.getPaginatedReaders(4, 2);
        expect(models_1.models.user.findAll).toBeCalledWith({
            where: {
                role: "Reader",
            },
            order: [["email", "ASC"]],
            offset: 4,
            limit: 2,
        });
        expect(result).toBe("Users");
    });
});
