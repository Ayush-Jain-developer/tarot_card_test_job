import { DataTypes, Model } from "sequelize";
import { sequelize } from "@database/connection";

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profilePicture: {
      type: DataTypes.STRING,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.ENUM("Reader", "Client"),
      allowNull: false,
    },
    stripeCustomerId: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "user",
    tableName: "users",
    paranoid: true,
    indexes: [{ unique: true, fields: ["email"] }],
  },
);

export default User;
