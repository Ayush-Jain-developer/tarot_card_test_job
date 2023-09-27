import { models } from "@database/models";
import { ProductsInterface } from "@interfaces";

class ProductsRepo {
  static createProduct(
    data: Pick<ProductsInterface, "id" | "amount" | "name" | "currency">,
  ) {
    return models.products.create(data);
  }
}

export default ProductsRepo;
