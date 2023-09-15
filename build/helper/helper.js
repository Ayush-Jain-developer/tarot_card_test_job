"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiResponse = exports.validateFields = void 0;
const validateFields = (reqObj) => {
    let errMessage = '';
    const keyValuePairs = Object.entries(reqObj);
    for (const [key, value] of keyValuePairs) {
        if (!value) {
            errMessage = `${key}`;
            break;
        }
        else if (Array.isArray(value) && !value.length) {
            errMessage = `${key}`;
            break;
        }
        else if (value instanceof Object && !Object.keys(value).length) {
            errMessage = `${key}`;
            break;
        }
    }
    if (errMessage) {
        errMessage += 'is required.';
    }
    return errMessage;
};
exports.validateFields = validateFields;
const apiResponse = (res, status, message, data) => {
    return res.json({
        status: status,
        message: message,
        data: data || []
    });
};
exports.apiResponse = apiResponse;
