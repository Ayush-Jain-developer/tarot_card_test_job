"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseSync = exports.models = void 0;
/* eslint-disable no-console */
const _messages_1 = __importDefault(require("@messages"));
const connection_1 = require("@database/connection");
const user_1 = __importDefault(require("@database/models/user"));
exports.models = { user: user_1.default };
const databaseSync = async () => {
    try {
        await connection_1.sequelize.sync({ force: false });
        console.log(_messages_1.default.dbSync);
    }
    catch (syncError) {
        console.log(_messages_1.default.dbSyncFail, syncError.message || syncError);
    }
};
exports.databaseSync = databaseSync;
