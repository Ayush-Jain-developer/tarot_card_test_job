/* eslint-disable no-console */
import { Dialect, Sequelize } from "sequelize";
import config from "@database/config";
import Messages from "@messages";

const database = config.database as string;
const username = config.username as string;
const password = config.password as string;
const host = config.host as string;
const dialect = config.dialect as Dialect;

export const sequelize = new Sequelize(database, username, password, {
  host,
  dialect,
  logging: false,
  define: {
    freezeTableName: true,
    timestamps: true,
    underscored: true,
  },
});

export const dbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log(Messages.dbConnection);
  } catch (dbError: any) {
    console.log(Messages.dbConnectionFail, dbError.message || dbError);
  }
};
