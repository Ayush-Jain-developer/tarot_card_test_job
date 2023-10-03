import { DataTypes, Model } from "sequelize";
import { sequelize } from "@database/connection";
import { PaymentMethodsInterface } from "@interfaces";

class PaymentMethods extends Model<PaymentMethodsInterface> {}
PaymentMethods.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    clientId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    stripeCusId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pmId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "paymentMethods",
    tableName: "PaymentMethods",
    indexes: [{ unique: true, fields: ["id"] }],
  },
);

export default PaymentMethods;
