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
    static noUserExist = "User not found. Please signUp.";
    static wrongPassword = "Password incorrect.";
    static loggedIn = "Logged in successfully.";
    static tokenMissing = "Unauthorized - Token missing";
    static invalidToken = "Unauthorized - Invalid token";
    static wrongUserRole = "Unauthorized - User role is not correct";
    static readerBioCreated = "Reader bio updated successfully.";
}
exports.default = Messages;
