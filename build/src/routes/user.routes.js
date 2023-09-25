"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const _controller_1 = __importDefault(require("@controller"));
const _utils_1 = require("@utils");
const multer_utils_1 = __importDefault(require("utils/multer.utils"));
const userRoute = express_1.default.Router();
userRoute.post("/signUp", (0, multer_utils_1.default)(), _controller_1.default.signUp);
userRoute.post("/logIn", _controller_1.default.logIn);
userRoute.post("/refreshToken", _utils_1.Jwt.verifyToken, _controller_1.default.tokenGeneration);
userRoute.put("/readerProfile", _utils_1.Jwt.verifyToken, _controller_1.default.updateReaderProfile);
userRoute.get("/user", _utils_1.Jwt.verifyToken, _controller_1.default.getUser);
userRoute.get("/allReaders", _utils_1.Jwt.verifyToken, _controller_1.default.getAllReaders);
exports.default = userRoute;
