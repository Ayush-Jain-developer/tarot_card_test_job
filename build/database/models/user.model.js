"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("@database/connection");
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    profilePicture: {
        type: sequelize_1.DataTypes.STRING,
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
    },
    role: {
        type: sequelize_1.DataTypes.ENUM("Reader", "Client"),
        allowNull: false,
    },
    stripeCusId: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    sequelize: connection_1.sequelize,
    modelName: "user",
    tableName: "users",
    paranoid: true,
    indexes: [{ unique: true, fields: ["email"] }],
});
exports.default = User;
