"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseSync = exports.models = void 0;
const _messages_1 = require("@messages");
const connection_1 = require("@database/connection");
const user_1 = require("@database/models/user");
exports.models = { user: user_1.user };
const databaseSync = async () => {
    try {
        await connection_1.sequelize.sync({ force: false });
        console.log(_messages_1.Messages.dbSync);
    }
    catch (syncError) {
        console.log(_messages_1.Messages.dbSyncFail, syncError.message || syncError);
    }
};
exports.databaseSync = databaseSync;
