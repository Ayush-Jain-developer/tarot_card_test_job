"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const _controller_1 = __importDefault(require("@controller"));
const _utils_1 = __importDefault(require("@utils"));
const userRoute = express_1.default.Router();
userRoute.post("/signUp", _controller_1.default.signUp);
userRoute.post("/logIn", _controller_1.default.logIn);
userRoute.put("/readerProfile", _utils_1.default.verifyToken, _controller_1.default.updateReaderProfile);
exports.default = userRoute;
