import { DataTypes } from "sequelize";
import { sequelize } from "@database/connection";

export const user = sequelize.define('users',{
    id: {
        type : DataTypes.UUID,
        primaryKey : true,
        defaultValue: DataTypes.UUIDV4
    },
    email: {
        type : DataTypes.STRING,
        allowNull : false
    },
    password: {
        type : DataTypes.STRING,
        allowNull: false
    },
    profilePicture: {
        type: DataTypes.STRING
    },
    firstName: {
        type : DataTypes.STRING
    },
    lastName: {
        type: DataTypes.STRING
    },
    role:{
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    paranoid: true,
    indexes : [{unique: true, fields : ['email']}] ,
})


