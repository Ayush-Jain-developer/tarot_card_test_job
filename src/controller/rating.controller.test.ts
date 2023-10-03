import { RatingService } from "@service";
import { apiResponse } from "@helper";
import { Request, Response, NextFunction } from "express";
import RatingController from "./rating.controller";

jest.mock("@helper", () => ({
  apiResponse: jest.fn().mockResolvedValue("Response"),
}));

describe("rating controller", () => {
  test("should return error in case of error from RatingService createRating function", async () => {
    const mockReq = { body: { id: "1234" } } as unknown as Request;
    const mockRes = {} as Response;
    const mockNext = (error: any) => error;
    RatingService.createRating = jest.fn().mockImplementation(() => {
      throw new Error("Error message");
    });
    const result = await RatingController.createRating(
      mockReq,
      mockRes,
      mockNext,
    );
    expect(RatingService.createRating).toBeCalledWith(mockReq.body);
    expect(apiResponse).not.toBeCalled();
    expect(result).toBeInstanceOf(Error);
  });

  test("should return reponse for createRating", async () => {
    const mockReq = { body: { id: "1234" } } as unknown as Request;
    const mockRes = {} as Response;
    const mockNext = {} as NextFunction;
    RatingService.createRating = jest.fn().mockImplementation(() => true);
    const result = await RatingController.createRating(
      mockReq,
      mockRes,
      mockNext,
    );
    expect(RatingService.createRating).toBeCalledWith(mockReq.body);
    expect(apiResponse).toBeCalled();
    expect(result).toBe("Response");
  });
});
