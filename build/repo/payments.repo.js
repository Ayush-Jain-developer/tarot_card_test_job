"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("@database/models");
class PaymentsRepo {
    static getPaymentMethods(userId) {
        return models_1.models.PaymentMethods.findOne({
            where: {
                clientId: userId,
            },
        });
    }
    static createPaymentMethod(data) {
        return models_1.models.PaymentMethods.create(data);
    }
}
exports.default = PaymentsRepo;
