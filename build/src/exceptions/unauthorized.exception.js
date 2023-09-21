"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UnauthorizedExceptionError extends Error {
    message;
    statusCode;
    constructor(message) {
        super(message);
        this.message = message;
        this.statusCode = 401;
    }
}
exports.default = UnauthorizedExceptionError;
