"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const nodeEnv = process.env.NODE_ENV || "development";
dotenv_1.default.config({ path: `.env.${nodeEnv}` });
exports.config = {
    database: process.env.DATABASE,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST_DEVELOPMENT,
    dialect: process.env.DB_DIALECT,
};
