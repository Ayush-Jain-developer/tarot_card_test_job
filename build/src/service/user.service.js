"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const _exceptions_1 = require("@exceptions");
const _helper_1 = require("@helper");
const bcrypt_1 = __importDefault(require("bcrypt"));
const _repo_1 = require("@repo");
const _messages_1 = __importDefault(require("@messages"));
const _utils_1 = __importDefault(require("@utils"));
class UserService {
    static async signUp(data) {
        _helper_1.ValidateFields.emailValidation(data.email);
        const email = data.email.toLowerCase();
        const user = await _repo_1.UserRepo.findUser(email);
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
        const createdUser = await _repo_1.UserRepo.createUser(userData);
        if (data.role === "Reader") {
            await _repo_1.ReaderBioRepo.createReaderBio({ id: createdUser.dataValues.id });
        }
        const token = _utils_1.default.createTokens({ id: createdUser.dataValues.id });
        return {
            ...createdUser.dataValues,
            ...token,
            refreshTokenExpiry: _messages_1.default.refreshTokenExpiry,
        };
    }
    static async logIn(data) {
        _helper_1.ValidateFields.emailValidation(data.email);
        const passwordSchema = joi_1.default.string().required();
        _helper_1.ValidateFields.passwordValidation(data.password, passwordSchema);
        const email = data.email.toLowerCase();
        const user = await _repo_1.UserRepo.findUser(email);
        if (!user) {
            throw new _exceptions_1.NotFoundExceptionError(_messages_1.default.noUserExist);
        }
        const comparePassword = await bcrypt_1.default.compare(data.password, user.dataValues.password);
        if (!comparePassword) {
            throw new _exceptions_1.UnauthorizedExceptionError(_messages_1.default.wrongPassword);
        }
        const token = _utils_1.default.createTokens({ id: user.dataValues.id });
        const responseData = {
            id: user.dataValues.id,
            role: user.dataValues.role,
            accessToken: token.accessToken,
            refreshToken: token.refreshToken,
            refreshTokenExpiry: _messages_1.default.refreshTokenExpiry,
        };
        if (user.dataValues.role === "Reader") {
            const readerBio = (await _repo_1.ReaderBioRepo.findReaderBioById(user.dataValues.id));
            if (readerBio.bio && readerBio.specialities.length) {
                responseData.profileUpdated = true;
            }
            else {
                responseData.profileUpdated = false;
            }
        }
        return responseData;
    }
    static async updateReaderProfile(data) {
        _helper_1.ValidateFields.stringRequired(data.bio, "Bio");
        _helper_1.ValidateFields.arrayRequired(data.specialities, "Specialities");
        const user = await _repo_1.UserRepo.findUserByID(data.id);
        if (user?.dataValues.role !== "Reader") {
            throw new _exceptions_1.UnauthorizedExceptionError(_messages_1.default.wrongUserRole);
        }
        const updatedProfile = await _repo_1.ReaderBioRepo.updateReaderProfile(data);
        return updatedProfile;
    }
    static async getUser(userId) {
        const user = await _repo_1.UserRepo.findUserByID(userId);
        if (!user) {
            throw new _exceptions_1.BadRequestExceptionError(_messages_1.default.noUserExist);
        }
        let responseData;
        if (user?.dataValues.role === "Reader") {
            const userBio = await _repo_1.ReaderBioRepo.findReaderBioById(userId);
            responseData = {
                id: user.dataValues.id,
                email: user.dataValues.email,
                profilePicture: user.dataValues.profilePicture,
                firstName: user.dataValues.firstName,
                lastName: user.dataValues.lastName,
                role: user.dataValues.role,
                bio: userBio?.dataValues.bio,
                specialities: userBio?.dataValues.specialities,
            };
        }
        else {
            responseData = {
                id: user?.dataValues.id,
                email: user?.dataValues.email,
                profilePicture: user?.dataValues.profilePicture,
                firstName: user?.dataValues.firstName,
                lastName: user?.dataValues.lastName,
                role: user?.dataValues.role,
            };
        }
        return responseData;
    }
}
exports.default = UserService;
