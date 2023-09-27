/* eslint-disable no-console */
import Messages from "@messages";
import { sequelize } from "@database/connection";
import user from "@database/models/user.model";
import readerBio from "@database/models/reader_bio.model";
import allotment from "./allotment.model";
import ratings from "./ratings.model";
import products from "./product.model";

export const models = { user, readerBio, allotment, ratings, products };

export const databaseSync = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log(Messages.dbSync);
  } catch (syncError: any) {
    console.log(Messages.dbSyncFail, syncError.message || syncError);
  }
};
