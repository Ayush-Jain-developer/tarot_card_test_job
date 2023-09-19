"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = exports.sequelize = void 0;
/* eslint-disable no-console */
const sequelize_1 = require("sequelize");
const config_1 = __importDefault(require("@database/config"));
const _messages_1 = __importDefault(require("@messages"));
const database = config_1.default.database;
const username = config_1.default.username;
const password = config_1.default.password;
const host = config_1.default.host;
const dialect = config_1.default.dialect;
exports.sequelize = new sequelize_1.Sequelize(database, username, password, {
    host,
    dialect,
    logging: false,
    define: {
        freezeTableName: true,
        timestamps: true,
        underscored: true,
    },
});
const dbConnection = async () => {
    try {
        await exports.sequelize.authenticate();
        console.log(_messages_1.default.dbConnection);
    }
    catch (dbError) {
        console.log(_messages_1.default.dbConnectionFail, dbError.message || dbError);
    }
};
exports.dbConnection = dbConnection;
