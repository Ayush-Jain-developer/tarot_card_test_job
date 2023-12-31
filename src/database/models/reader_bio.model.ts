import { DataTypes } from "sequelize";
import { sequelize } from "@database/connection";
import User from "./user.model";

class ReaderBio extends User {}
ReaderBio.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    bio: {
      type: DataTypes.TEXT,
    },
    specialities: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  },
  {
    sequelize,
    modelName: "readerBio",
    tableName: "reader_bio",
    paranoid: true,
    indexes: [{ unique: true, fields: ["id"] }],
  },
);

export default ReaderBio;
