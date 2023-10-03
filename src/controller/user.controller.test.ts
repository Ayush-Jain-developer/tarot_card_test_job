import { UserService } from "@service";
import { NextFunction, Request, Response } from "express";
import { apiResponse } from "@helper";
import { Jwt } from "@utils";
import UserController from "./user.controller";

jest.mock("@helper", () => ({
  apiResponse: jest.fn().mockImplementation(() => "Response"),
}));

describe("user controller", () => {
  test("should return error in case of error from UserService signUp function", async () => {
    UserService.signUp = jest.fn().mockImplementation(() => {
      throw new Error("Error message");
    });
    const mockReq = {} as Request;
    const mockRes = {} as Response;
    const mockNext = (error: any) => error;
    const result = await UserController.signUp(mockReq, mockRes, mockNext);
    expect(UserService.signUp).toBeCalled();
    expect(result).toBeInstanceOf(Error);
  });

  test("should return response for signUp", async () => {
    UserService.signUp = jest.fn().mockImplementation(() => true);
    const mockReq = {} as Request;
    const mockRes = {} as Response;
    const mockNext = {} as NextFunction;
    const result = await UserController.signUp(mockReq, mockRes, mockNext);
    expect(UserService.signUp).toBeCalled();
    expect(apiResponse).toBeCalled();
    expect(result).toBe("Response");
  });

  test("should return error in case of error from UserService logIn function", async () => {
    UserService.logIn = jest.fn().mockImplementation(() => {
      throw new Error("Error message");
    });
    const mockReq = {} as Request;
    const mockRes = {} as Response;
    const mockNext = (error: any) => error;
    const result = await UserController.logIn(mockReq, mockRes, mockNext);
    expect(UserService.logIn).toBeCalled();
    expect(result).toBeInstanceOf(Error);
  });

  test("should return response for logIn", async () => {
    UserService.logIn = jest.fn().mockImplementation(() => true);
    const mockReq = {} as Request;
    const mockRes = {} as Response;
    const mockNext = {} as NextFunction;
    const result = await UserController.logIn(mockReq, mockRes, mockNext);
    expect(UserService.logIn).toBeCalled();
    expect(apiResponse).toBeCalled();
    expect(result).toBe("Response");
  });

  test("should return error in case of error from UserService updateReaderProfile function", async () => {
    UserService.updateReaderProfile = jest.fn().mockImplementation(() => {
      throw new Error("Error message");
    });
    const mockReq = {} as Request;
    const mockRes = {} as Response;
    const mockNext = (error: any) => error;
    const result = await UserController.updateReaderProfile(
      mockReq,
      mockRes,
      mockNext,
    );
    expect(UserService.updateReaderProfile).toBeCalled();
    expect(result).toBeInstanceOf(Error);
  });

  //   test("should return response for updateReaderProfile", async () => {
  //     const mockReq = { body: { id: "1234" } } as Request;
  //     const mockRes = {} as Response;
  //     const mockNext = {} as NextFunction;
  //     UserService.updateReaderProfile = jest
  //       .fn()
  //       .mockImplementation(() => ({ count: 1 }));
  //     const result = await UserController.updateReaderProfile(
  //       mockReq,
  //       mockRes,
  //       mockNext,
  //     );
  //     expect(UserService.updateReaderProfile).toBeCalledWith(mockReq.body);
  //     expect(apiResponse).toBeCalled();
  //     expect(result).toBe("Response");
  //   });

  test("should return token response", async () => {
    Jwt.createTokens = jest.fn();
    const mockReq = { body: { id: "1234" } } as Request;
    const mockRes = {} as Response;
    const result = await UserController.tokenGeneration(mockReq, mockRes);
    expect(Jwt.createTokens).toBeCalledWith(mockReq.body);
    expect(result).toBe("Response");
  });

  test("should return error in case of error from UserService getUser function", async () => {
    const mockReq = { body: { id: "1234" } } as Request;
    const mockRes = {} as Response;
    const mockNext = (error: any) => error;
    UserService.getUser = jest.fn().mockImplementation(() => {
      throw new Error("Error message");
    });
    const result = await UserController.getUser(mockReq, mockRes, mockNext);
    expect(UserService.getUser).toBeCalledWith(mockReq.body.id);
    expect(result).toBeInstanceOf(Error);
  });

  test("should return response for getUser", async () => {
    const mockReq = { body: { id: "1234" } } as Request;
    const mockRes = {} as Response;
    const mockNext = {} as NextFunction;
    UserService.getUser = jest.fn().mockImplementation(() => true);
    const result = await UserController.getUser(mockReq, mockRes, mockNext);
    expect(UserService.getUser).toBeCalledWith(mockReq.body.id);
    expect(apiResponse).toBeCalled();
    expect(result).toBe("Response");
  });

  test("should return error in case of error from UserService getAllReaders function", async () => {
    const mockReq = {
      query: { pageNumber: 1, pageSize: 2 },
    } as unknown as Request;
    const mockRes = {} as Response;
    const mockNext = (error: any) => error;
    UserService.getAllReaders = jest.fn().mockImplementation(() => {
      throw new Error("Error message");
    });
    const result = await UserController.getAllReaders(
      mockReq,
      mockRes,
      mockNext,
    );
    expect(UserService.getAllReaders).toBeCalledWith(
      mockReq.query.pageNumber,
      mockReq.query.pageSize,
    );
    expect(result).toBeInstanceOf(Error);
  });

  test("should return response for getAllReaders", async () => {
    const mockReq = {
      query: { pageNumber: 1, pageSize: 2 },
    } as unknown as Request;
    const mockRes = {} as Response;
    const mockNext = {} as NextFunction;
    UserService.getAllReaders = jest.fn().mockImplementation(() => true);
    const result = await UserController.getAllReaders(
      mockReq,
      mockRes,
      mockNext,
    );
    expect(UserService.getAllReaders).toBeCalledWith(
      mockReq.query.pageNumber,
      mockReq.query.pageSize,
    );
    expect(apiResponse).toBeCalled();
    expect(result).toBe("Response");
  });
});
