"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const config_1 = require("@database/config");
const _messages_1 = require("@messages");
const database = config_1.config.database;
const username = config_1.config.username;
const password = config_1.config.password;
const host = config_1.config.host;
const dialect = config_1.config.dialect;
exports.sequelize = new sequelize_1.Sequelize(database, username, password, {
    host: host,
    dialect: dialect,
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
        console.log(_messages_1.Messages.dbConnection);
    }
    catch (dbError) {
        console.log(_messages_1.Messages.dbConnectionFail, dbError.message || dbError);
    }
};
exports.dbConnection = dbConnection;
