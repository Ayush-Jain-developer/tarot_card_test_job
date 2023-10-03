"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("@database/models");
const payments_repo_1 = __importDefault(require("./payments.repo"));
const mockPaymentCreateData = {
    clientId: "4d03f61c-9912-418a-8809-91fbb73ceb05",
    stripeCusId: "cus_OifCXIoWlC5BKu",
    pmId: "4d03f61c-9912-418a-8809-91fbb73ceb04",
};
describe("Payments repo", () => {
    test("should find payment methods", async () => {
        models_1.models.PaymentMethods.findOne = jest
            .fn()
            .mockResolvedValue("Payment Method");
        const result = await payments_repo_1.default.getPaymentMethods("4d03f61c-9912-418a-8809-91fbb73ceb05");
        expect(models_1.models.PaymentMethods.findOne).toBeCalledWith({
            where: {
                clientId: "4d03f61c-9912-418a-8809-91fbb73ceb05",
            },
        });
        expect(result).toBe("Payment Method");
    });
    test("should create payment method", async () => {
        models_1.models.PaymentMethods.create = jest
            .fn()
            .mockImplementation(() => "Payment Method");
        const result = await payments_repo_1.default.createPaymentMethod(mockPaymentCreateData);
        expect(models_1.models.PaymentMethods.create).toBeCalledWith(mockPaymentCreateData);
        expect(result).toBe("Payment Method");
    });
});
