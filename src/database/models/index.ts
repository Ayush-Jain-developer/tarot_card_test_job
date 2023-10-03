/* eslint-disable no-console */
import Messages from "@messages";
import { sequelize } from "@database/connection";
import user from "@database/models/user.model";
import readerBio from "@database/models/reader_bio.model";
import allotment from "@database/models/allotment.model";
import ratings from "@database/models/ratings.model";
import products from "@database/models/product.model";
import PaymentMethods from "./paymentMethods.model";

export const models = {
  user,
  readerBio,
  allotment,
  ratings,
  products,
  PaymentMethods,
};

export const databaseSync = async () => {
  try {
    await sequelize.sync({ force: false });
    console.log(Messages.dbSync);
  } catch (syncError: any) {
    console.log(Messages.dbSyncFail, syncError.message || syncError);
  }
};
