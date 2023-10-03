"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _service_1 = require("@service");
const _helper_1 = require("@helper");
const _utils_1 = require("@utils");
const user_controller_1 = __importDefault(require("./user.controller"));
jest.mock("@helper", () => ({
    apiResponse: jest.fn().mockImplementation(() => "Response"),
}));
describe("user controller", () => {
    test("should return error in case of error from UserService signUp function", async () => {
        _service_1.UserService.signUp = jest.fn().mockImplementation(() => {
            throw new Error("Error message");
        });
        const mockReq = {};
        const mockRes = {};
        const mockNext = (error) => error;
        const result = await user_controller_1.default.signUp(mockReq, mockRes, mockNext);
        expect(_service_1.UserService.signUp).toBeCalled();
        expect(result).toBeInstanceOf(Error);
    });
    test("should return response for signUp", async () => {
        _service_1.UserService.signUp = jest.fn().mockImplementation(() => true);
        const mockReq = {};
        const mockRes = {};
        const mockNext = {};
        const result = await user_controller_1.default.signUp(mockReq, mockRes, mockNext);
        expect(_service_1.UserService.signUp).toBeCalled();
        expect(_helper_1.apiResponse).toBeCalled();
        expect(result).toBe("Response");
    });
    test("should return error in case of error from UserService logIn function", async () => {
        _service_1.UserService.logIn = jest.fn().mockImplementation(() => {
            throw new Error("Error message");
        });
        const mockReq = {};
        const mockRes = {};
        const mockNext = (error) => error;
        const result = await user_controller_1.default.logIn(mockReq, mockRes, mockNext);
        expect(_service_1.UserService.logIn).toBeCalled();
        expect(result).toBeInstanceOf(Error);
    });
    test("should return response for logIn", async () => {
        _service_1.UserService.logIn = jest.fn().mockImplementation(() => true);
        const mockReq = {};
        const mockRes = {};
        const mockNext = {};
        const result = await user_controller_1.default.logIn(mockReq, mockRes, mockNext);
        expect(_service_1.UserService.logIn).toBeCalled();
        expect(_helper_1.apiResponse).toBeCalled();
        expect(result).toBe("Response");
    });
    test("should return error in case of error from UserService updateReaderProfile function", async () => {
        _service_1.UserService.updateReaderProfile = jest.fn().mockImplementation(() => {
            throw new Error("Error message");
        });
        const mockReq = {};
        const mockRes = {};
        const mockNext = (error) => error;
        const result = await user_controller_1.default.updateReaderProfile(mockReq, mockRes, mockNext);
        expect(_service_1.UserService.updateReaderProfile).toBeCalled();
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
        _utils_1.Jwt.createTokens = jest.fn();
        const mockReq = { body: { id: "1234" } };
        const mockRes = {};
        const result = await user_controller_1.default.tokenGeneration(mockReq, mockRes);
        expect(_utils_1.Jwt.createTokens).toBeCalledWith(mockReq.body);
        expect(result).toBe("Response");
    });
    test("should return error in case of error from UserService getUser function", async () => {
        const mockReq = { body: { id: "1234" } };
        const mockRes = {};
        const mockNext = (error) => error;
        _service_1.UserService.getUser = jest.fn().mockImplementation(() => {
            throw new Error("Error message");
        });
        const result = await user_controller_1.default.getUser(mockReq, mockRes, mockNext);
        expect(_service_1.UserService.getUser).toBeCalledWith(mockReq.body.id);
        expect(result).toBeInstanceOf(Error);
    });
    test("should return response for getUser", async () => {
        const mockReq = { body: { id: "1234" } };
        const mockRes = {};
        const mockNext = {};
        _service_1.UserService.getUser = jest.fn().mockImplementation(() => true);
        const result = await user_controller_1.default.getUser(mockReq, mockRes, mockNext);
        expect(_service_1.UserService.getUser).toBeCalledWith(mockReq.body.id);
        expect(_helper_1.apiResponse).toBeCalled();
        expect(result).toBe("Response");
    });
    test("should return error in case of error from UserService getAllReaders function", async () => {
        const mockReq = {
            query: { pageNumber: 1, pageSize: 2 },
        };
        const mockRes = {};
        const mockNext = (error) => error;
        _service_1.UserService.getAllReaders = jest.fn().mockImplementation(() => {
            throw new Error("Error message");
        });
        const result = await user_controller_1.default.getAllReaders(mockReq, mockRes, mockNext);
        expect(_service_1.UserService.getAllReaders).toBeCalledWith(mockReq.query.pageNumber, mockReq.query.pageSize);
        expect(result).toBeInstanceOf(Error);
    });
    test("should return response for getAllReaders", async () => {
        const mockReq = {
            query: { pageNumber: 1, pageSize: 2 },
        };
        const mockRes = {};
        const mockNext = {};
        _service_1.UserService.getAllReaders = jest.fn().mockImplementation(() => true);
        const result = await user_controller_1.default.getAllReaders(mockReq, mockRes, mockNext);
        expect(_service_1.UserService.getAllReaders).toBeCalledWith(mockReq.query.pageNumber, mockReq.query.pageSize);
        expect(_helper_1.apiResponse).toBeCalled();
        expect(result).toBe("Response");
    });
});
