"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _helper_1 = require("@helper");
const _messages_1 = __importDefault(require("@messages"));
const _service_1 = require("@service");
class PaymentsController {
    static async getPaymentMethods(req, res, next) {
        const userId = req.body.id;
        try {
            const response = await _service_1.PaymentsService.getPaymentMethods(userId);
            if (!response) {
                const message = _messages_1.default.noCards;
                return (0, _helper_1.apiResponse)(res, 200, message);
            }
            const message = _messages_1.default.userCards;
            return (0, _helper_1.apiResponse)(res, 200, message, response);
        }
        catch (error) {
            return next(error);
        }
    }
}
exports.default = PaymentsController;
