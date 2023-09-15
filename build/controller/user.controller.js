"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const _service_1 = require("@service");
const _helper_1 = require("@helper");
const _messages_1 = require("@messages");
class UserController {
    static async signUp(req, res, next) {
        const data = req.body;
        try {
            const response = await _service_1.UserService.signUp(data);
            const message = _messages_1.Messages.signedUp;
            return (0, _helper_1.apiResponse)(res, 200, message, response);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.UserController = UserController;
