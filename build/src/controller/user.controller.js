"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _service_1 = __importDefault(require("@service"));
const _helper_1 = require("@helper");
const _messages_1 = __importDefault(require("@messages"));
class UserController {
    static async signUp(req, res, next) {
        const data = req.body;
        try {
            const response = await _service_1.default.signUp(data);
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
            const response = await _service_1.default.logIn(data);
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
            const response = await _service_1.default.updateReaderProfile(data);
            const message = _messages_1.default.readerBioCreated;
            return (0, _helper_1.apiResponse)(res, 200, message, response[1][0]);
        }
        catch (error) {
            return next(error);
        }
    }
}
exports.default = UserController;
