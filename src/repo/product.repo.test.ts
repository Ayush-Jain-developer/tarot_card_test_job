import { models } from "@database/models";
import ProductsRepo from "./product.repo";

const mockProductData = {
  readerId: "4d03f61c-9912-418a-8809-91fbb73ceb05",
  name: "New Service",
  amount: 20,
};

describe("Product repo", () => {
  test("should create product", async () => {
    models.products.create = jest.fn().mockImplementation(() => "Product");
    const result = await ProductsRepo.createProduct(mockProductData);
    expect(models.products.create).toBeCalledWith(mockProductData);
    expect(result).toBe("Product");
  });
});
