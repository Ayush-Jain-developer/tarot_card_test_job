"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsController = exports.ProductsController = exports.RatingController = exports.UserController = void 0;
const user_controller_1 = __importDefault(require("./user.controller"));
exports.UserController = user_controller_1.default;
const product_controller_1 = __importDefault(require("./product.controller"));
exports.ProductsController = product_controller_1.default;
const rating_controller_1 = __importDefault(require("./rating.controller"));
exports.RatingController = rating_controller_1.default;
const payments_controller_1 = __importDefault(require("./payments.controller"));
exports.PaymentsController = payments_controller_1.default;
