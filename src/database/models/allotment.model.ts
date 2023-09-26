import { DataTypes, Model } from "sequelize";
import { sequelize } from "@database/connection";

class Allotment extends Model {}
Allotment.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    clientId: {
      type: DataTypes.STRING,
    },
    readerId: {
      type: DataTypes.STRING,
    },
    paymentId: {
      type: DataTypes.STRING,
    },
    date: {
      type: DataTypes.DATE,
    },
    startTime: {
      type: DataTypes.DATE,
    },
    duration: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "allotment",
    tableName: "allotments",
    indexes: [{ unique: true, fields: ["id"] }],
  },
);

export default Allotment;
