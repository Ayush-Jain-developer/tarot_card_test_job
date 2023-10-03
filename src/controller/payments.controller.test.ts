import { PaymentsService } from "@service";
import { Request, Response, NextFunction } from "express";
import { apiResponse } from "@helper";
import PaymentsController from "./payments.controller";

jest.mock("@helper", () => ({
  apiResponse: jest.fn().mockResolvedValue("Response"),
}));

describe("Payments controller", () => {
  test("should return error in case of error from PaymentsService getPaymentMethods function", async () => {
    const mockReq = { body: { id: "1234" } } as unknown as Request;
    const mockRes = {} as Response;
    const mockNext = (error: any) => error;
    PaymentsService.getPaymentMethods = jest.fn().mockImplementation(() => {
      throw new Error("Error message");
    });
    const result = await PaymentsController.getPaymentMethods(
      mockReq,
      mockRes,
      mockNext,
    );
    expect(PaymentsService.getPaymentMethods).toBeCalledWith(mockReq.body.id);
    expect(apiResponse).not.toBeCalled();
    expect(result).toBeInstanceOf(Error);
  });

  test("should return reponse for getPaymentMethods", async () => {
    const mockReq = { body: { id: "1234" } } as unknown as Request;
    const mockRes = {} as Response;
    const mockNext = {} as NextFunction;
    PaymentsService.getPaymentMethods = jest
      .fn()
      .mockImplementation(() => true);
    const result = await PaymentsController.getPaymentMethods(
      mockReq,
      mockRes,
      mockNext,
    );
    expect(PaymentsService.getPaymentMethods).toBeCalledWith(mockReq.body.id);
    expect(apiResponse).toBeCalled();
    expect(result).toBe("Response");
  });
});
