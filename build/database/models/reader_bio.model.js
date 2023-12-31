"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("@database/connection");
const user_model_1 = __importDefault(require("./user.model"));
class ReaderBio extends user_model_1.default {
}
ReaderBio.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
    },
    bio: {
        type: sequelize_1.DataTypes.TEXT,
    },
    specialities: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
    },
}, {
    sequelize: connection_1.sequelize,
    modelName: "readerBio",
    tableName: "reader_bio",
    paranoid: true,
    indexes: [{ unique: true, fields: ["id"] }],
});
exports.default = ReaderBio;
