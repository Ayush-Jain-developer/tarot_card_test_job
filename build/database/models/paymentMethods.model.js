"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("@database/connection");
class PaymentMethods extends sequelize_1.Model {
}
PaymentMethods.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
    clientId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    stripeCusId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    pmId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    sequelize: connection_1.sequelize,
    modelName: "paymentMethods",
    tableName: "PaymentMethods",
    indexes: [{ unique: true, fields: ["id"] }],
});
exports.default = PaymentMethods;
