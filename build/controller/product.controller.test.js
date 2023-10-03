"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _service_1 = require("@service");
const _helper_1 = require("@helper");
const product_controller_1 = __importDefault(require("./product.controller"));
jest.mock("@helper", () => ({
    apiResponse: jest.fn().mockResolvedValue("Response"),
}));
describe("Product controller", () => {
    test("should return error in case of error from ProductsService createProduct function", async () => {
        const mockReq = { body: { id: "1234" } };
        const mockRes = {};
        const mockNext = (error) => error;
        _service_1.ProductsService.createProduct = jest.fn().mockImplementation(() => {
            throw new Error("Error message");
        });
        const result = await product_controller_1.default.createProduct(mockReq, mockRes, mockNext);
        expect(_service_1.ProductsService.createProduct).toBeCalledWith(mockReq.body);
        expect(_helper_1.apiResponse).not.toBeCalled();
        expect(result).toBeInstanceOf(Error);
    });
    test("should return reponse for createProduct", async () => {
        const mockReq = { body: { id: "1234" } };
        const mockRes = {};
        const mockNext = {};
        _service_1.ProductsService.createProduct = jest.fn().mockImplementation(() => true);
        const result = await product_controller_1.default.createProduct(mockReq, mockRes, mockNext);
        expect(_service_1.ProductsService.createProduct).toBeCalledWith(mockReq.body);
        expect(_helper_1.apiResponse).toBeCalled();
        expect(result).toBe("Response");
    });
});
