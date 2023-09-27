import { Jwt } from "@utils";
import { ProductsController } from "@controller";
import express from "express";

const productRoute = express.Router();

productRoute.post(
  "/product",
  Jwt.verifyToken,
  ProductsController.createProduct,
);

export default productRoute;
