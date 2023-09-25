"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _service_1 = __importDefault(require("@service"));
const _helper_1 = require("@helper");
const _messages_1 = __importDefault(require("@messages"));
const _utils_1 = require("@utils");
class UserController {
    static async signUp(req, res, next) {
        const data = req.body;
        try {
            const response = await _service_1.default.signUp(req, data);
            const message = _messages_1.default.signedUp;
            return (0, _helper_1.apiResponse)(res, 200, message, response);
        }
        catch (error) {
            return next(error);
        }
    }
    static async logIn(req, res, next) {
        const data = req.body;
        try {
            const response = await _service_1.default.logIn(req, data);
            const message = _messages_1.default.loggedIn;
            return (0, _helper_1.apiResponse)(res, 200, message, response);
        }
        catch (error) {
            return next(error);
        }
    }
    static async updateReaderProfile(req, res, next) {
        const data = req.body;
        try {
            const response = await _service_1.default.updateReaderProfile(req, data);
            const message = _messages_1.default.readerBioCreated;
            return (0, _helper_1.apiResponse)(res, 200, message, response[1][0]);
        }
        catch (error) {
            return next(error);
        }
    }
    static async tokenGeneration(req, res) {
        const userId = req.body.id;
        const response = _utils_1.Jwt.createTokens({ id: userId });
        const message = _messages_1.default.tokensGenerated;
        return (0, _helper_1.apiResponse)(res, 200, message, {
            ...response,
            refreshTokenExpiry: _messages_1.default.refreshTokenExpiry,
        });
    }
    static async getUser(req, res, next) {
        const userId = req.body.id;
        try {
            const response = await _service_1.default.getUser(userId);
            const message = _messages_1.default.userData;
            return (0, _helper_1.apiResponse)(res, 200, message, response);
        }
        catch (error) {
            return next(error);
        }
    }
    static async getAllReaders(req, res, next) {
        const data = req.body;
        try {
            const response = await _service_1.default.getAllReaders(data);
            const message = _messages_1.default.readerPaginatedData;
            return (0, _helper_1.apiResponse)(res, 200, message, response);
        }
        catch (error) {
            return next(error);
        }
    }
}
exports.default = UserController;
