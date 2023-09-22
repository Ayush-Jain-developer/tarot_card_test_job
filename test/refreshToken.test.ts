import UserController from "@controller";
import Jwt from "@utils";
import { Request, Response } from "express";

test("should generate tokens", async () => {
  const spyCreateTokens = jest.spyOn(Jwt, "createTokens");
  const mockReq = { body: { id: "123" } } as Request;
  const mockRes = { json: jest.fn() } as unknown as Response;
  await UserController.tokenGeneration(mockReq, mockRes);
  expect(spyCreateTokens).toHaveBeenCalledTimes(1);
  expect(spyCreateTokens).toBeCalledWith({ id: "123" });
  expect(mockRes.json).toHaveBeenCalledTimes(1);
});
