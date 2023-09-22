"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _controller_1 = __importDefault(require("@controller"));
const _utils_1 = __importDefault(require("@utils"));
test("should generate tokens", async () => {
    const spyCreateTokens = jest.spyOn(_utils_1.default, "createTokens");
    const mockReq = { body: { id: "123" } };
    const mockRes = { json: jest.fn() };
    await _controller_1.default.tokenGeneration(mockReq, mockRes);
    expect(spyCreateTokens).toHaveBeenCalledTimes(1);
    expect(spyCreateTokens).toBeCalledWith({ id: "123" });
    expect(mockRes.json).toHaveBeenCalledTimes(1);
});
