import dotenv from "dotenv";
import Stripe from "stripe";

const NODE_ENV = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${NODE_ENV}` });

const stripe = new Stripe(process.env.STRIPE_KEY as string, {
  apiVersion: "2023-08-16",
});

export default stripe;
