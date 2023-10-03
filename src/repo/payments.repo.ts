import { models } from "@database/models";
import Cards from "@database/models/paymentMethods.model";

class PaymentsRepo {
  static getPaymentMethods(userId: string): Promise<Cards | null> {
    return models.PaymentMethods.findOne({
      where: {
        clientId: userId,
      },
    });
  }

  static createPaymentMethod(data: {
    clientId: string;
    stripeCusId: string;
    pmId: string;
  }) {
    return models.PaymentMethods.create(data);
  }
}

export default PaymentsRepo;
