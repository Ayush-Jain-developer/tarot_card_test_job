/* eslint-disable no-console */
import Messages from "@messages";
import { sequelize } from "@database/connection";
import user from "@database/models/user";
import readerBio from "@database/models/reader_bio";

export const models = { user, readerBio };

export const databaseSync = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log(Messages.dbSync);
  } catch (syncError: any) {
    console.log(Messages.dbSyncFail, syncError.message || syncError);
  }
};
