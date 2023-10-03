import { errorMessage, apiResponse } from "@helper";
import { Response } from "express";

describe("helper functions", () => {
  test("should return new string from errorMessage function", () => {
    const word = "Email";
    const message = '"value" must be a valid email';
    const result = errorMessage(word, message);
    expect(result).toBe("Email must be a valid email");
  });

  test("should return API response from apiResponse", () => {
    const res = new Response() as unknown as Response;
    res.json = jest.fn();
    apiResponse(res, 200, "Response");
    expect(res.json).toHaveBeenCalledWith({
      status: 200,
      message: "Response",
      data: [],
    });
  });
});
