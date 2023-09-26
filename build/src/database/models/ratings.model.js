"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const connection_1 = require("@database/connection");
class Ratings extends sequelize_1.Model {
    id;
    senderId;
    receiverId;
    rating;
    review;
}
Ratings.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
    },
    senderId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    receiverId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    rating: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    review: {
        type: sequelize_1.DataTypes.TEXT,
    },
}, {
    sequelize: connection_1.sequelize,
    modelName: "ratings",
    tableName: "ratings",
    indexes: [{ unique: true, fields: ["id"] }],
});
exports.default = Ratings;
