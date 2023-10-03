import ValidateFields from "@validations";
import { ProductsInterface } from "@interfaces";
import { productsRepo } from "@repo";
import { UnauthorizedExceptionError } from "@exceptions";
import Messages from "@messages";

class ProductsService {
  static async createProduct(data: ProductsInterface & { role: string }) {
    ValidateFields.stringRequired(data.readerId, "Reader ID");
    ValidateFields.stringRequired(data.name, "Name");
    ValidateFields.decimalRequired(data.amount, "Amount");
    ValidateFields.stringRequired(data.role, "Role");
    const { id, role, ...finalData } = data;
    if (data.role !== "Reader") {
      throw new UnauthorizedExceptionError(Messages.wrongUserRole);
    }
    const response = await productsRepo.createProduct(finalData);
    return response.dataValues;
  }
}

export default ProductsService;
