"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const stripe_1 = __importDefault(require("stripe"));
const NODE_ENV = process.env.NODE_ENV || "development";
dotenv_1.default.config({ path: `.env.${NODE_ENV}` });
const stripe = new stripe_1.default(process.env.STRIPE_KEY, {
    apiVersion: "2023-08-16",
});
exports.default = stripe;
