"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _utils_1 = require("@utils");
const _controller_1 = require("@controller");
const express_1 = __importDefault(require("express"));
const paymentsRoute = express_1.default.Router();
paymentsRoute.get("/paymentMethods", _utils_1.Jwt.verifyToken, _controller_1.PaymentsController.getPaymentMethods);
paymentsRoute.post("/makePayment", _utils_1.Jwt.verifyToken);
exports.default = paymentsRoute;
