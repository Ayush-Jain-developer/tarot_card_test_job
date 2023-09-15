"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BadRequestExceptionError = void 0;
class BadRequestExceptionError extends Error {
    message;
    statusCode;
    constructor(message) {
        super(message);
        this.message = message;
        this.statusCode = 400;
    }
}
exports.BadRequestExceptionError = BadRequestExceptionError;
