import { ProductsService } from "@service";
import { Request, Response, NextFunction } from "express";
import { apiResponse } from "@helper";
import ProductsController from "./product.controller";

jest.mock("@helper", () => ({
  apiResponse: jest.fn().mockResolvedValue("Response"),
}));

describe("Product controller", () => {
  test("should return error in case of error from ProductsService createProduct function", async () => {
    const mockReq = { body: { id: "1234" } } as unknown as Request;
    const mockRes = {} as Response;
    const mockNext = (error: any) => error;
    ProductsService.createProduct = jest.fn().mockImplementation(() => {
      throw new Error("Error message");
    });
    const result = await ProductsController.createProduct(
      mockReq,
      mockRes,
      mockNext,
    );
    expect(ProductsService.createProduct).toBeCalledWith(mockReq.body);
    expect(apiResponse).not.toBeCalled();
    expect(result).toBeInstanceOf(Error);
  });

  test("should return reponse for createProduct", async () => {
    const mockReq = { body: { id: "1234" } } as unknown as Request;
    const mockRes = {} as Response;
    const mockNext = {} as NextFunction;
    ProductsService.createProduct = jest.fn().mockImplementation(() => true);
    const result = await ProductsController.createProduct(
      mockReq,
      mockRes,
      mockNext,
    );
    expect(ProductsService.createProduct).toBeCalledWith(mockReq.body);
    expect(apiResponse).toBeCalled();
    expect(result).toBe("Response");
  });
});
