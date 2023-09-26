"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingRepo = exports.ReaderBioRepo = exports.UserRepo = void 0;
const users_repo_1 = __importDefault(require("./users.repo"));
exports.UserRepo = users_repo_1.default;
const readerProfile_repo_1 = __importDefault(require("./readerProfile.repo"));
exports.ReaderBioRepo = readerProfile_repo_1.default;
const ratings_repo_1 = __importDefault(require("./ratings.repo"));
exports.RatingRepo = ratings_repo_1.default;
