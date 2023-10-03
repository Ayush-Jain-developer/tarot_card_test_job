import { Jwt } from "@utils";
import { PaymentsController } from "@controller";
import express from "express";

const paymentsRoute = express.Router();

paymentsRoute.get(
  "/paymentMethods",
  Jwt.verifyToken,
  PaymentsController.getPaymentMethods,
);

paymentsRoute.post("/makePayment", Jwt.verifyToken);

export default paymentsRoute;
