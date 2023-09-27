"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Messages {
    static emailExist = "Email already exists";
    static dbSync = "Database is synced";
    static dbSyncFail = "Unable to sync database:";
    static signedUp = "Signed up successfully";
    static dbConnection = "Database connection established successfully";
    static dbConnectionFail = "Unable to connect to the database:";
    static server = "Server started at port ";
    static serverError = "Internal server error";
    static passwordNotMatch = "Password and Confirm Password do not match";
    static noUserExist = "User not found. Please signUp";
    static wrongPassword = "Password incorrect";
    static loggedIn = "Logged in successfully";
    static tokenMissing = "Unauthorized - Token missing";
    static invalidToken = "Unauthorized - Invalid token";
    static wrongUserRole = "Unauthorized - User role is not correct";
    static readerBioCreated = "Reader bio updated successfully";
    static tokenExpired = "Unauthorized - User session expired";
    static refreshTokenExpiry = "7 Days";
    static tokensGenerated = "Access and Refresh tokens generated successfully";
    static userData = "User Data";
    static readerPaginatedData = "Reader data for the given page number and page size";
    static invalidFileType = "Invalid file type. Only JPEG, JPG, PNG, and SVG files are allowed";
    static userRating = "User review and rating saved successfully";
    static ratingGiven = "Your rating has already been saved for the given user";
}
exports.default = Messages;
