"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const joi_1 = __importDefault(require("joi"));
const _exceptions_1 = require("@exceptions");
const _helper_1 = require("@helper");
const bcrypt_1 = __importDefault(require("bcrypt"));
const _repo_1 = require("@repo");
const _messages_1 = require("@messages");
class UserService {
    static async signUp(data) {
        const emailSchema = joi_1.default.string().email().required();
        const emailValidation = emailSchema.validate(data.email);
        if (emailValidation.error) {
            const message = (0, _helper_1.errorMessage)("Email", emailValidation.error.details[0].message);
            throw new _exceptions_1.BadRequestExceptionError(message);
        }
        const user = await _repo_1.UserRepo.findUser(data.email);
        if (user) {
            throw new _exceptions_1.BadRequestExceptionError(_messages_1.Messages.emailExist);
        }
        _helper_1.ValidateFields.stringRequired(data.role, 'Role');
        const passwordSchema = joi_1.default.string().min(8).max(30).required();
        const passwordValidation = passwordSchema.validate(data.password);
        if (passwordValidation.error) {
            const message = (0, _helper_1.errorMessage)("Password", passwordValidation.error.details[0].message);
            throw new _exceptions_1.BadRequestExceptionError(message);
        }
        const salt = await bcrypt_1.default.genSalt(10);
        const hash = await bcrypt_1.default.hash(data.password, salt);
        const userData = {
            email: data.email,
            password: hash,
            firstName: data.firstName,
            lastName: data.lastName,
            role: data.role,
        };
        return _repo_1.UserRepo.createUser(userData);
    }
}
exports.UserService = UserService;
