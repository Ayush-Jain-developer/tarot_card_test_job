"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ratingRoute = exports.userRoute = void 0;
const user_routes_1 = __importDefault(require("./user.routes"));
exports.userRoute = user_routes_1.default;
const rating_route_1 = __importDefault(require("./rating.route"));
exports.ratingRoute = rating_route_1.default;
