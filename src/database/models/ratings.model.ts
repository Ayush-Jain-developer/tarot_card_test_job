import { DataTypes, Model } from "sequelize";
import { sequelize } from "@database/connection";
import { RatingInterface } from "@interfaces";

class Ratings extends Model<RatingInterface> implements RatingInterface {
  id?: string | undefined;

  senderId!: string;

  receiverId!: string;

  rating!: 1 | 2 | 3 | 4 | 5;

  review?: string;
}
Ratings.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    senderId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    receiverId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    review: {
      type: DataTypes.TEXT,
    },
  },
  {
    sequelize,
    modelName: "ratings",
    tableName: "ratings",
    indexes: [{ unique: true, fields: ["id"] }],
  },
);

export default Ratings;
