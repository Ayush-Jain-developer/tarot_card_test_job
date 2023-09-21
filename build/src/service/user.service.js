"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const _exceptions_1 = require("@exceptions");
const _helper_1 = require("@helper");
const bcrypt_1 = __importDefault(require("bcrypt"));
const _repo_1 = __importDefault(require("@repo"));
const _messages_1 = __importDefault(require("@messages"));
const _utils_1 = __importDefault(require("@utils"));
const readerProfile_repo_1 = __importDefault(require("repo/readerProfile.repo"));
class UserService {
    static async signUp(data) {
        _helper_1.ValidateFields.emailValidation(data.email);
        const email = data.email.toLowerCase();
        const user = await _repo_1.default.findUser(email);
        if (user) {
            throw new _exceptions_1.BadRequestExceptionError(_messages_1.default.emailExist);
        }
        _helper_1.ValidateFields.stringRequired(data.role, "Role");
        const passwordSchema = joi_1.default.string().min(8).max(30).required();
        _helper_1.ValidateFields.passwordValidation(data.password, passwordSchema);
        if (data.password !== data.confirmPassword) {
            throw new _exceptions_1.BadRequestExceptionError(_messages_1.default.passwordNotMatch);
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
        if (data.role === "Reader") {
            await readerProfile_repo_1.default.createReaderBio({ id: createdUser.dataValues.id });
        }
        const token = _utils_1.default.createToken(createdUser.dataValues);
        return { ...createdUser.dataValues, token };
    }
    static async logIn(data) {
        _helper_1.ValidateFields.emailValidation(data.email);
        const passwordSchema = joi_1.default.string().required();
        _helper_1.ValidateFields.passwordValidation(data.password, passwordSchema);
        const email = data.email.toLowerCase();
        const user = await _repo_1.default.findUser(email);
        if (!user) {
            throw new _exceptions_1.NotFoundExceptionError(_messages_1.default.noUserExist);
        }
        const comparePassword = await bcrypt_1.default.compare(data.password, user.dataValues.password);
        if (!comparePassword) {
            throw new _exceptions_1.UnauthorizedExceptionError(_messages_1.default.wrongPassword);
        }
        const token = _utils_1.default.createToken(user.dataValues);
        return { token };
    }
    static async updateReaderProfile(data) {
        const user = await _repo_1.default.findUserByID(data.id);
        if (user?.dataValues.role !== "Reader") {
            throw new _exceptions_1.UnauthorizedExceptionError(_messages_1.default.wrongUserRole);
        }
        const updatedProfile = await readerProfile_repo_1.default.updateReaderProfile(data);
        return updatedProfile;
    }
}
exports.default = UserService;
