"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _service_1 = require("@service");
const _messages_1 = __importDefault(require("@messages"));
const _helper_1 = require("@helper");
class ProductsController {
    static async createProduct(req, res, next) {
        const data = req.body;
        try {
            const response = await _service_1.ProductsService.createProduct(data);
            const message = _messages_1.default.serviceAdded;
            return (0, _helper_1.apiResponse)(res, 200, message, response);
        }
        catch (error) {
            return next(error);
        }
    }
}
exports.default = ProductsController;
