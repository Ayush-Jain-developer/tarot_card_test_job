"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _validations_1 = __importDefault(require("@validations"));
const _repo_1 = require("@repo");
const _exceptions_1 = require("@exceptions");
const _messages_1 = __importDefault(require("@messages"));
class ProductsService {
    static async createProduct(data) {
        _validations_1.default.stringRequired(data.readerId, "Reader ID");
        _validations_1.default.stringRequired(data.name, "Name");
        _validations_1.default.decimalRequired(data.amount, "Amount");
        _validations_1.default.stringRequired(data.role, "Role");
        const { id, role, ...finalData } = data;
        if (data.role !== "Reader") {
            throw new _exceptions_1.UnauthorizedExceptionError(_messages_1.default.wrongUserRole);
        }
        const response = await _repo_1.productsRepo.createProduct(finalData);
        return response.dataValues;
    }
}
exports.default = ProductsService;
