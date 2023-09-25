"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiResponse = exports.ValidateFields = exports.errorMessage = void 0;
const joi_1 = __importDefault(require("joi"));
const _exceptions_1 = require("@exceptions");
const fs_1 = __importDefault(require("fs"));
const errorMessage = (word, message) => {
    const originalString = message;
    const wordToReplace = '"value"';
    const newWord = word;
    const regex = new RegExp(wordToReplace, "gi");
    return originalString.replace(regex, newWord);
};
exports.errorMessage = errorMessage;
class ValidateFields {
    static stringRequired(req, field, word) {
        const schema = joi_1.default.string().required();
        const validation = schema.validate(field);
        if (validation.error) {
            const message = (0, exports.errorMessage)(word, validation.error.details[0].message);
            if (req.file) {
                fs_1.default.unlinkSync(req.file.path);
            }
            throw new _exceptions_1.BadRequestExceptionError(message);
        }
    }
    static arrayRequired(field, word) {
        const schema = joi_1.default.array().items(joi_1.default.string()).min(1);
        const validation = schema.validate(field);
        if (validation.error) {
            const message = (0, exports.errorMessage)(word, validation.error.details[0].message);
            throw new _exceptions_1.BadRequestExceptionError(message);
        }
    }
    static emailValidation(req, email) {
        const schema = joi_1.default.string().email().required();
        const validation = schema.validate(email);
        if (validation.error) {
            const message = (0, exports.errorMessage)("Email", validation.error.details[0].message);
            if (req.file) {
                fs_1.default.unlinkSync(req.file.path);
            }
            throw new _exceptions_1.BadRequestExceptionError(message);
        }
    }
    static passwordValidation(req, password, schema) {
        const validation = schema.validate(password);
        if (validation.error) {
            const message = (0, exports.errorMessage)("Password", validation.error.details[0].message);
            if (req.file) {
                fs_1.default.unlinkSync(req.file.path);
            }
            throw new _exceptions_1.BadRequestExceptionError(message);
        }
    }
}
exports.ValidateFields = ValidateFields;
const apiResponse = (res, statusCode, message, data) => {
    res.json({
        status: statusCode,
        message,
        data: data || [],
    });
};
exports.apiResponse = apiResponse;
