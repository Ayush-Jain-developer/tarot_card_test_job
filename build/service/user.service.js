"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const _exceptions_1 = __importDefault(require("@exceptions"));
const _helper_1 = require("@helper");
const bcrypt_1 = __importDefault(require("bcrypt"));
const _repo_1 = __importDefault(require("@repo"));
const _messages_1 = __importDefault(require("@messages"));
const _utils_1 = __importDefault(require("@utils"));
const dotenv_1 = __importDefault(require("dotenv"));
const NODE_ENV = process.env.NODE_ENV || "development";
dotenv_1.default.config({ path: `.env.${NODE_ENV}` });
const secretKey = process.env.SECRET_KEY;
class UserService {
    static async signUp(data) {
        const emailSchema = joi_1.default.string().email().required();
        const emailValidation = emailSchema.validate(data.email);
        if (emailValidation.error) {
            const message = (0, _helper_1.errorMessage)("Email", emailValidation.error.details[0].message);
            throw new _exceptions_1.default(message);
        }
        const email = data.email.toLowerCase();
        const user = await _repo_1.default.findUser(email);
        if (user) {
            throw new _exceptions_1.default(_messages_1.default.emailExist);
        }
        _helper_1.ValidateFields.stringRequired(data.role, "Role");
        const passwordSchema = joi_1.default.string().min(8).max(30).required();
        const passwordValidation = passwordSchema.validate(data.password);
        if (passwordValidation.error) {
            const message = (0, _helper_1.errorMessage)("Password", passwordValidation.error.details[0].message);
            throw new _exceptions_1.default(message);
        }
        if (data.password !== data.confirmPassword) {
            throw new _exceptions_1.default(_messages_1.default.passwordNotMatch);
        }
        const salt = await bcrypt_1.default.genSalt(10);
        const hash = await bcrypt_1.default.hash(data.password, salt);
        const userData = {
            email,
            password: hash,
            firstName: data.firstName,
            lastName: data.lastName,
            role: data.role,
        };
        const createdUser = await _repo_1.default.createUser(userData);
        const token = _utils_1.default.createToken(createdUser.dataValues, secretKey);
        return { ...createdUser.dataValues, token };
    }
}
exports.default = UserService;
