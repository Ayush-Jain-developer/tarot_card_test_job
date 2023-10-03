"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _helper_1 = require("@helper");
describe("helper functions", () => {
    test("should return new string from errorMessage function", () => {
        const word = "Email";
        const message = '"value" must be a valid email';
        const result = (0, _helper_1.errorMessage)(word, message);
        expect(result).toBe("Email must be a valid email");
    });
    test("should return API response from apiResponse", () => {
        const res = new Response();
        res.json = jest.fn();
        (0, _helper_1.apiResponse)(res, 200, "Response");
        expect(res.json).toHaveBeenCalledWith({
            status: 200,
            message: "Response",
            data: [],
        });
    });
});
