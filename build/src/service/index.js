"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingService = exports.UserService = void 0;
const user_service_1 = __importDefault(require("./user.service"));
exports.UserService = user_service_1.default;
const rating_service_1 = __importDefault(require("./rating.service"));
exports.RatingService = rating_service_1.default;
