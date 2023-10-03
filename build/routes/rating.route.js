"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _utils_1 = require("@utils");
const rating_controller_1 = __importDefault(require("controller/rating.controller"));
const express_1 = __importDefault(require("express"));
const ratingRoute = express_1.default.Router();
ratingRoute.post("/rating", _utils_1.Jwt.verifyToken, rating_controller_1.default.createRating);
exports.default = ratingRoute;
