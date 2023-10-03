"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsRepo = exports.productsRepo = exports.RatingRepo = exports.ReaderBioRepo = exports.UserRepo = void 0;
const users_repo_1 = __importDefault(require("./users.repo"));
exports.UserRepo = users_repo_1.default;
const readerProfile_repo_1 = __importDefault(require("./readerProfile.repo"));
exports.ReaderBioRepo = readerProfile_repo_1.default;
const ratings_repo_1 = __importDefault(require("./ratings.repo"));
exports.RatingRepo = ratings_repo_1.default;
const product_repo_1 = __importDefault(require("./product.repo"));
exports.productsRepo = product_repo_1.default;
const payments_repo_1 = __importDefault(require("./payments.repo"));
exports.PaymentsRepo = payments_repo_1.default;
