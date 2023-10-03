"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("@database/models");
class ProductsRepo {
    static createProduct(data) {
        return models_1.models.products.create(data);
    }
}
exports.default = ProductsRepo;
