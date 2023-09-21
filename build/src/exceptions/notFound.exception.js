"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NotFoundExceptionError extends Error {
    message;
    statusCode;
    constructor(message) {
        super();
        this.message = message;
        this.statusCode = 404;
    }
}
exports.default = NotFoundExceptionError;
