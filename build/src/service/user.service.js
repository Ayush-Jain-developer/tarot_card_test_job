"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const fs_1 = __importDefault(require("fs"));
const _exceptions_1 = require("@exceptions");
const _validations_1 = __importDefault(require("@validations"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const _repo_1 = require("@repo");
const _messages_1 = __importDefault(require("@messages"));
const _utils_1 = require("@utils");
const dotenv_1 = __importDefault(require("dotenv"));
const NODE_ENV = process.env.NODE_ENV || "development";
dotenv_1.default.config({ path: `.env.${NODE_ENV}` });
class UserService {
    static async signUp(req, data) {
        _validations_1.default.emailValidation(req, data.email);
        _validations_1.default.stringRequired(req, data.role, "Role");
        const passwordSchema = joi_1.default.string().min(8).max(30).required();
        _validations_1.default.passwordValidation(req, data.password, passwordSchema);
        if (data.password !== data.confirmPassword) {
            if (req.file) {
                fs_1.default.unlinkSync(req.file.path);
            }
            throw new _exceptions_1.BadRequestExceptionError(_messages_1.default.passwordNotMatch);
        }
        const mail = data.email.toLowerCase();
        const user = await _repo_1.UserRepo.findUser(mail);
        if (user) {
            if (req.file) {
                fs_1.default.unlinkSync(req.file.path);
            }
            throw new _exceptions_1.BadRequestExceptionError(_messages_1.default.emailExist);
        }
        const salt = await bcrypt_1.default.genSalt(10);
        const hash = await bcrypt_1.default.hash(data.password, salt);
        let responseData;
        const { id, email, password, confirmPassword, createdAt, updatedAt, deletedAt, profilePicture, ...userData } = data;
        if (req.file) {
            await (0, _utils_1.uploadFile)(req.file.path);
            fs_1.default.unlinkSync(req.file.path);
            const profile = process.env.S3_URL + req.file.path;
            responseData = {
                email: mail,
                password: hash,
                ...userData,
                profilePicture: profile,
            };
        }
        else {
            responseData = {
                email: mail,
                password: hash,
                ...userData,
            };
        }
        const createdUser = await _repo_1.UserRepo.createUser(responseData);
        if (data.role === "Reader") {
            await _repo_1.ReaderBioRepo.createReaderBio({ id: createdUser.dataValues.id });
        }
        const token = _utils_1.Jwt.createTokens({ id: createdUser.dataValues.id });
        return {
            ...createdUser.dataValues,
            ...token,
            refreshTokenExpiry: _messages_1.default.refreshTokenExpiry,
        };
    }
    static async logIn(req, data) {
        _validations_1.default.emailValidation(req, data.email);
        const passwordSchema = joi_1.default.string().required();
        _validations_1.default.passwordValidation(req, data.password, passwordSchema);
        const email = data.email.toLowerCase();
        const user = await _repo_1.UserRepo.findUser(email);
        if (!user) {
            throw new _exceptions_1.NotFoundExceptionError(_messages_1.default.noUserExist);
        }
        const comparePassword = await bcrypt_1.default.compare(data.password, user.dataValues.password);
        if (!comparePassword) {
            throw new _exceptions_1.UnauthorizedExceptionError(_messages_1.default.wrongPassword);
        }
        const token = _utils_1.Jwt.createTokens({ id: user.dataValues.id });
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
    static async updateReaderProfile(req, data) {
        _validations_1.default.stringRequired(req, data.bio, "Bio");
        _validations_1.default.arrayRequired(data.specialities, "Specialities");
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
        const { password, confirmPassword, createdAt, updatedAt, deletedAt, ...userData } = user.dataValues;
        if (user?.dataValues.role === "Reader") {
            const userBio = await _repo_1.ReaderBioRepo.findReaderBioById(userId);
            responseData = {
                ...userData,
                bio: userBio?.dataValues.bio,
                specialities: userBio?.dataValues.specialities,
            };
        }
        else {
            responseData = {
                ...userData,
            };
        }
        return responseData;
    }
    static async getAllReaders(pageNumber, pageSize) {
        _validations_1.default.queryStringRequired(pageNumber, "Page number");
        _validations_1.default.queryStringRequired(pageSize, "Page size");
        const readerCount = await _repo_1.UserRepo.countAllReaders();
        const limit = pageSize;
        const offset = (pageNumber - 1) * limit;
        const response = await _repo_1.UserRepo.getPaginatedReaders(offset, limit);
        return {
            ...response,
            meta: {
                totalPages: Math.ceil(readerCount.count / pageSize),
                currentPage: pageNumber,
                previousPage: pageNumber === 1 ? null : pageNumber - 1,
                nextPage: pageNumber + 1 > Math.ceil(readerCount.count / pageSize)
                    ? null
                    : pageNumber + 1,
                pageSize,
            },
        };
    }
}
exports.default = UserService;
