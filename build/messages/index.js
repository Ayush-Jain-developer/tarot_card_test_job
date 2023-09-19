"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Messages {
    static emailExist = "Email already exists.";
    static dbSync = "Database is synced.";
    static dbSyncFail = "Unable to sync database:";
    static signedUp = "Signed up successfully.";
    static dbConnection = "Database connection established successfully.";
    static dbConnectionFail = "Unable to connect to the database:";
    static server = "Server started at port ";
    static serverError = "Internal server error.";
    static passwordNotMatch = "Password and Confirm Password do not match.";
}
exports.default = Messages;
