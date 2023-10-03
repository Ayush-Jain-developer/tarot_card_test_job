"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const _exceptions_1 = require("@exceptions");
const _messages_1 = __importDefault(require("@messages"));
const jwt_utils_1 = __importDefault(require("./jwt.utils"));
const NODE_ENV = process.env.NODE_ENV || "development";
dotenv_1.default.config({ path: `.env.${NODE_ENV}` });
const secretKey = process.env.SECRET_KEY;
describe("Jwt", () => {
    test("should create token", () => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRkMDNmNjFjLTk5MTItNDE4YS04O";
        const payLoad = {
            id: "4d03f61c-9912-418a-8809-91fbb73ceb05",
        };
        jsonwebtoken_1.default.sign = jest.fn().mockReturnValue(token);
        const result = jwt_utils_1.default.createTokens(payLoad);
        expect(jsonwebtoken_1.default.sign).toBeCalledWith(payLoad, secretKey, {
            expiresIn: "2d",
        });
        expect(jsonwebtoken_1.default.sign).toBeCalledWith(payLoad, secretKey, {
            expiresIn: "7d",
        });
        expect(result).toStrictEqual({ accessToken: token, refreshToken: token });
    });
    test("should return error for missing token", () => {
        const req = {};
        const res = {};
        const next = {};
        req.header = jest.fn().mockReturnValue("");
        try {
            jwt_utils_1.default.verifyToken(req, res, next);
        }
        catch (error) {
            expect(error).toBeInstanceOf(_exceptions_1.UnauthorizedExceptionError);
            expect(error.message).toBe(_messages_1.default.tokenMissing);
        }
    });
    //   test("should return error for expired token", () => {
    //     const req = {} as Request;
    //     req.header = jest.fn().mockResolvedValue("ExpiredToken");
    //     const res = {} as Response;
    //     const next = jest.fn();
    //     jwt.verify = jest.fn().mockImplementation(() => {
    //       {
    //         ("TokenExpiredError");
    //       }
    //     });
    //     Jwt.verifyToken(req, res, next);
    //     expect(next).toBeCalledWith(
    //       new UnauthorizedExceptionError(Messages.tokenExpired),
    //     );
    //   });
});
