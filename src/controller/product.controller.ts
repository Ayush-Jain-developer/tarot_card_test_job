import { Request, Response, NextFunction } from "express";
import { ProductsInterface } from "@interfaces";
import { ProductsService } from "@service";
import Messages from "@messages";
import { apiResponse } from "@helper";

class ProductsController {
  static async createProduct(req: Request, res: Response, next: NextFunction) {
    const data: ProductsInterface = req.body;
    try {
      const response = await ProductsService.createProduct(data);
      const message = Messages.serviceAdded;
      return apiResponse(res, 200, message, response);
    } catch (error: any) {
      return next(error);
    }
  }
}

export default ProductsController;
