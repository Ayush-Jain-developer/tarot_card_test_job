import { models } from "@database/models";
import { ProductsInterface } from "@interfaces";

class ProductsRepo {
  static createProduct(data: Omit<ProductsInterface, "id">) {
    return models.products.create(data);
  }
}

export default ProductsRepo;
