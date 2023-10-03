"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _repo_1 = require("@repo");
const _utils_1 = require("@utils");
const _validations_1 = __importDefault(require("@validations"));
class PaymentsService {
    static async getPaymentMethods(userId) {
        const userPaymentMethods = await _repo_1.PaymentsRepo.getPaymentMethods(userId);
        if (userPaymentMethods?.dataValues) {
            const paymentMethodsList = await _utils_1.stripe.customers.listPaymentMethods(userPaymentMethods.dataValues.stripeCusId, {
                type: "card",
            });
            return paymentMethodsList.data;
        }
        return false;
    }
    static async makePayment(data) {
        _validations_1.default.stringRequired(data.stripeCusId, "Stripe customer ID");
        _validations_1.default.stringRequired(data.number, "Card number is required");
        _validations_1.default.integerRequired(data.expMonth, "Expiry month", 1, 12);
        _validations_1.default.integerRequired(data.expYear, "Expiry year", new Date().getFullYear(), new Date().getFullYear() + 10);
        _validations_1.default.stringRequired(data.cvc, "CVC");
        _validations_1.default.decimalRequired(data.amount, "Amount");
        const paymentMethod = await _utils_1.stripe.paymentMethods.create({
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
        await _repo_1.PaymentsRepo.createPaymentMethod(setData);
        const paymentIntent = await _utils_1.stripe.paymentIntents.create({
            amount: data.amount,
            currency: data.currency || "usd",
            payment_method_types: ["card"],
            automatic_payment_methods: { enabled: true },
            setup_future_usage: "on_session",
        });
        return paymentIntent.client_secret;
    }
}
exports.default = PaymentsService;
