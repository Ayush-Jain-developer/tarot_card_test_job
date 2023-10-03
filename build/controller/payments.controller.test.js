"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _service_1 = require("@service");
const _helper_1 = require("@helper");
const payments_controller_1 = __importDefault(require("./payments.controller"));
jest.mock("@helper", () => ({
    apiResponse: jest.fn().mockResolvedValue("Response"),
}));
describe("Payments controller", () => {
    test("should return error in case of error from PaymentsService getPaymentMethods function", async () => {
        const mockReq = { body: { id: "1234" } };
        const mockRes = {};
        const mockNext = (error) => error;
        _service_1.PaymentsService.getPaymentMethods = jest.fn().mockImplementation(() => {
            throw new Error("Error message");
        });
        const result = await payments_controller_1.default.getPaymentMethods(mockReq, mockRes, mockNext);
        expect(_service_1.PaymentsService.getPaymentMethods).toBeCalledWith(mockReq.body.id);
        expect(_helper_1.apiResponse).not.toBeCalled();
        expect(result).toBeInstanceOf(Error);
    });
    test("should return reponse for getPaymentMethods", async () => {
        const mockReq = { body: { id: "1234" } };
        const mockRes = {};
        const mockNext = {};
        _service_1.PaymentsService.getPaymentMethods = jest
            .fn()
            .mockImplementation(() => true);
        const result = await payments_controller_1.default.getPaymentMethods(mockReq, mockRes, mockNext);
        expect(_service_1.PaymentsService.getPaymentMethods).toBeCalledWith(mockReq.body.id);
        expect(_helper_1.apiResponse).toBeCalled();
        expect(result).toBe("Response");
    });
});
