import { DataTypes, Model } from "sequelize";
import { sequelize } from "@database/connection";

class Products extends Model {}
Products.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    readerId: {
      type: DataTypes.STRING,
      allowNull: false,
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
      defaultValue: "usd",
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
