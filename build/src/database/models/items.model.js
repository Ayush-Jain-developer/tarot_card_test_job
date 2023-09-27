"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("@database/connection");
const user_model_1 = __importDefault(require("./user.model"));
class Items extends user_model_1.default {
}
Items.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    currency: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: connection_1.sequelize,
    modelName: "items",
    tableName: "items",
    indexes: [{ unique: true, fields: ["id"] }],
});
exports.default = Items;
