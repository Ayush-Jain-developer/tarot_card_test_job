"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("@database/models");
const product_repo_1 = __importDefault(require("./product.repo"));
const mockProductData = {
    readerId: "4d03f61c-9912-418a-8809-91fbb73ceb05",
    name: "New Service",
    amount: 20,
};
describe("Product repo", () => {
    test("should create product", async () => {
        models_1.models.products.create = jest.fn().mockImplementation(() => "Product");
        const result = await product_repo_1.default.createProduct(mockProductData);
        expect(models_1.models.products.create).toBeCalledWith(mockProductData);
        expect(result).toBe("Product");
    });
});
