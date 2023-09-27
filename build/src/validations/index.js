"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const _exceptions_1 = require("@exceptions");
const _helper_1 = require("@helper");
class ValidateFields {
    static stringRequired(field, word) {
        const schema = joi_1.default.string().required();
        const validation = schema.validate(field);
        if (validation.error) {
            const message = (0, _helper_1.errorMessage)(word, validation.error.details[0].message);
            throw new _exceptions_1.BadRequestExceptionError(message);
        }
    }
    static integerRequired(field, word) {
        const schema = joi_1.default.number().integer().min(1).max(5).required();
        const validation = schema.validate(field);
        if (validation.error) {
            const message = (0, _helper_1.errorMessage)(word, validation.error.details[0].message);
            throw new _exceptions_1.BadRequestExceptionError(message);
        }
    }
    static queryStringRequired(field, word) {
        const querySchema = joi_1.default.number().integer().min(1).required();
        const validation = querySchema.validate(field);
        if (validation.error) {
            const message = (0, _helper_1.errorMessage)(word, validation.error.details[0].message);
            throw new _exceptions_1.BadRequestExceptionError(message);
        }
    }
    static arrayRequired(field, word) {
        const schema = joi_1.default.array().items(joi_1.default.string()).min(1);
        const validation = schema.validate(field);
        if (validation.error) {
            const message = (0, _helper_1.errorMessage)(word, validation.error.details[0].message);
            throw new _exceptions_1.BadRequestExceptionError(message);
        }
    }
    static emailValidation(email) {
        const schema = joi_1.default.string().email().required();
        const validation = schema.validate(email);
        if (validation.error) {
            const message = (0, _helper_1.errorMessage)("Email", validation.error.details[0].message);
            throw new _exceptions_1.BadRequestExceptionError(message);
        }
    }
    static passwordValidation(password, schema) {
        const validation = schema.validate(password);
        if (validation.error) {
            const message = (0, _helper_1.errorMessage)("Password", validation.error.details[0].message);
            throw new _exceptions_1.BadRequestExceptionError(message);
        }
    }
}
exports.default = ValidateFields;
