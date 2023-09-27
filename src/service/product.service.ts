import ValidateFields from "@validations";
import { ProductsInterface } from "@interfaces";
import { productsRepo } from "@repo";

class ProductsService {
  static async createProduct(data: ProductsInterface) {
    ValidateFields.stringRequired(data.name, "Name");
    ValidateFields.decimalRequired(data.amount, "Amount");
    const response = await productsRepo.createProduct(data);
    return response.dataValues;
  }
}

export default ProductsService;
