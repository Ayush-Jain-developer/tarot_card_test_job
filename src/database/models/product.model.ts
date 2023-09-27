import { DataTypes } from "sequelize";
import { sequelize } from "@database/connection";
import User from "./user.model";

class Products extends User {}
Products.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "USD",
    },
  },
  {
    sequelize,
    modelName: "products",
    tableName: "products",
    indexes: [{ unique: true, fields: ["id"] }],
  },
);

export default Products;
