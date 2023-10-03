"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentsRoute = exports.productRoute = exports.ratingRoute = exports.userRoute = void 0;
const user_routes_1 = __importDefault(require("./user.routes"));
exports.userRoute = user_routes_1.default;
const rating_route_1 = __importDefault(require("./rating.route"));
exports.ratingRoute = rating_route_1.default;
const product_route_1 = __importDefault(require("./product.route"));
exports.productRoute = product_route_1.default;
const payments_route_1 = __importDefault(require("./payments.route"));
exports.paymentsRoute = payments_route_1.default;
