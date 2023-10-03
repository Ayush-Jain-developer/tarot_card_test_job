import { CardsInterface } from "@interfaces";
import { PaymentsRepo } from "@repo";
import { stripe } from "@utils";
import ValidateFields from "@validations";

class PaymentsService {
  static async getPaymentMethods(userId: string) {
    const userPaymentMethods = await PaymentsRepo.getPaymentMethods(userId);
    if (userPaymentMethods?.dataValues) {
      const paymentMethodsList = await stripe.customers.listPaymentMethods(
        userPaymentMethods.dataValues.stripeCusId,
        {
          type: "card",
        },
      );
      return paymentMethodsList.data;
    }
    return false;
  }

  static async makePayment(data: CardsInterface) {
    ValidateFields.stringRequired(data.stripeCusId, "Stripe customer ID");
    ValidateFields.stringRequired(data.number, "Card number is required");
    ValidateFields.integerRequired(data.expMonth, "Expiry month", 1, 12);
    ValidateFields.integerRequired(
      data.expYear,
      "Expiry year",
      new Date().getFullYear(),
      new Date().getFullYear() + 10,
    );
    ValidateFields.stringRequired(data.cvc, "CVC");
    ValidateFields.decimalRequired(data.amount, "Amount");
    const paymentMethod = await stripe.paymentMethods.create({
      type: "card",
      card: {
        number: data.number,
        exp_month: data.expMonth,
        exp_year: data.expYear,
        cvc: data.cvc,
      },
    });
    const setData = {
      clientId: data.id,
      stripeCusId: data.stripeCusId,
      pmId: paymentMethod.id,
    };
    await PaymentsRepo.createPaymentMethod(setData);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: data.amount,
      currency: data.currency || "usd",
      payment_method_types: ["card"],
      automatic_payment_methods: { enabled: true },
      setup_future_usage: "on_session",
    });
    return paymentIntent.client_secret;
  }
}

export default PaymentsService;
