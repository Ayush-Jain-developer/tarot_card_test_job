"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Jwt {
    static createToken(payLoad, secretKey) {
        return jsonwebtoken_1.default.sign(payLoad, secretKey);
    }
    static verifyToken(token, secretKey) {
        return jsonwebtoken_1.default.verify(token, secretKey);
    }
}
exports.default = Jwt;
