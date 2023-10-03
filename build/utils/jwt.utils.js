"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _exceptions_1 = require("@exceptions");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const _messages_1 = __importDefault(require("@messages"));
const NODE_ENV = process.env.NODE_ENV || "development";
dotenv_1.default.config({ path: `.env.${NODE_ENV}` });
const secretKey = process.env.SECRET_KEY;
class Jwt {
    static createTokens(payLoad) {
        const accessToken = jsonwebtoken_1.default.sign(payLoad, secretKey, {
            expiresIn: "2d",
        });
        const refreshToken = jsonwebtoken_1.default.sign(payLoad, secretKey, {
            expiresIn: "7d",
        });
        return { accessToken, refreshToken };
    }
    static verifyToken(req, res, next) {
        const token = req.header("Authorization");
        if (!token) {
            throw new _exceptions_1.UnauthorizedExceptionError(_messages_1.default.tokenMissing);
        }
        jsonwebtoken_1.default.verify(token, secretKey, (err, decoded) => {
            if (err) {
                if (err.name === "TokenExpiredError") {
                    return next(new _exceptions_1.UnauthorizedExceptionError(_messages_1.default.tokenExpired));
                }
                return next(new _exceptions_1.UnauthorizedExceptionError(_messages_1.default.invalidToken));
            }
            const result = decoded;
            req.body.id = result.id;
            return next();
        });
    }
}
exports.default = Jwt;
