"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _utils_1 = require("@utils");
const _controller_1 = require("@controller");
const express_1 = __importDefault(require("express"));
const productRoute = express_1.default.Router();
productRoute.post("/product", _utils_1.Jwt.verifyToken, _controller_1.ProductsController.createProduct);
exports.default = productRoute;
