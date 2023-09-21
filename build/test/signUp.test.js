"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _service_1 = __importDefault(require("@service"));
const _exceptions_1 = require("@exceptions");
const actualMockData = {
    email: "ayushjn@gmail.com",
    password: "12345678",
    confirmPassword: "12345678",
    firstName: "Ayush ",
    lastName: "Jain ",
    role: "Reader",
};
const wrongEmailMockData = {
    email: "ayushjngmail.com",
    password: "12345678",
    confirmPassword: "12345678",
    firstName: "Ayush ",
    lastName: "Jain ",
    role: "Reader",
};
describe("signUp API", () => {
    test("should return error for email", async () => {
        const response = await _service_1.default.signUp(wrongEmailMockData);
        expect(response).toThrow(new _exceptions_1.BadRequestExceptionError("Email must be a valid email."));
    });
});
