"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiResponse = exports.errorMessage = void 0;
const errorMessage = (word, message) => {
    const originalString = message;
    const wordToReplace = '"value"';
    const newWord = word;
    const regex = new RegExp(wordToReplace, "gi");
    return originalString.replace(regex, newWord);
};
exports.errorMessage = errorMessage;
const apiResponse = (res, statusCode, message, data) => {
    res.json({
        status: statusCode,
        message,
        data: data || [],
    });
};
exports.apiResponse = apiResponse;
