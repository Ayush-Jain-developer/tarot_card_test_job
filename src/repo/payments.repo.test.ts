import { models } from "@database/models";
import PaymentsRepo from "./payments.repo";

const mockPaymentCreateData = {
  clientId: "4d03f61c-9912-418a-8809-91fbb73ceb05",
  stripeCusId: "cus_OifCXIoWlC5BKu",
  pmId: "4d03f61c-9912-418a-8809-91fbb73ceb04",
};

describe("Payments repo", () => {
  test("should find payment methods", async () => {
    models.PaymentMethods.findOne = jest
      .fn()
      .mockResolvedValue("Payment Method");
    const result = await PaymentsRepo.getPaymentMethods(
      "4d03f61c-9912-418a-8809-91fbb73ceb05",
    );
    expect(models.PaymentMethods.findOne).toBeCalledWith({
      where: {
        clientId: "4d03f61c-9912-418a-8809-91fbb73ceb05",
      },
    });
    expect(result).toBe("Payment Method");
  });

  test("should create payment method", async () => {
    models.PaymentMethods.create = jest
      .fn()
      .mockImplementation(() => "Payment Method");
    const result = await PaymentsRepo.createPaymentMethod(
      mockPaymentCreateData,
    );
    expect(models.PaymentMethods.create).toBeCalledWith(mockPaymentCreateData);
    expect(result).toBe("Payment Method");
  });
});
