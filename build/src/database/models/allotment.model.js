"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("@database/connection");
class Allotment extends sequelize_1.Model {
}
Allotment.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
    clientId: {
        type: sequelize_1.DataTypes.STRING,
    },
    readerId: {
        type: sequelize_1.DataTypes.STRING,
    },
    paymentId: {
        type: sequelize_1.DataTypes.STRING,
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
    },
    startTime: {
        type: sequelize_1.DataTypes.DATE,
    },
    duration: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    sequelize: connection_1.sequelize,
    modelName: "allotment",
    tableName: "allotments",
    indexes: [{ unique: true, fields: ["id"] }],
});
exports.default = Allotment;
