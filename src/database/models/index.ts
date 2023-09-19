/* eslint-disable no-console */
import Messages from "@messages";
import { sequelize } from "@database/connection";
import user from "@database/models/user";

export const models = { user };

export const databaseSync = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log(Messages.dbSync);
  } catch (syncError: any) {
    console.log(Messages.dbSyncFail, syncError.message || syncError);
  }
};
