"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BadRequestExceptionError extends Error {
    message;
    statusCode;
    constructor(message) {
        super();
        this.message = message;
        this.statusCode = 400;
    }
}
exports.default = BadRequestExceptionError;
