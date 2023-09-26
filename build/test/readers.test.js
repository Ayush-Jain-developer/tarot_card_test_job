"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = require("@database/models");
const _exceptions_1 = require("@exceptions");
const _repo_1 = require("@repo");
const _service_1 = require("@service");
const mockDataValue = {
    "0": {
        id: "2c0a8e0f-313f-49cc-902e-133fbce068c4",
        email: "john1@gmail.com",
        password: "$2b$10$b4KhPFXIZLSi63ZQR4f7gus5YyPaHg.0mxFa3lH1/xSeShyKH5a2.",
        profilePicture: "https://tarotcardtestjob.s3.ap-south-1.amazonaws.com/uploads/profile-1695644792575.jpg",
        firstName: "john",
        lastName: "doe",
        role: "Reader",
        createdAt: "2023-09-25T12:26:33.671Z",
        updatedAt: "2023-09-25T12:26:33.671Z",
        deletedAt: null,
    },
    "1": {
        id: "d3495e91-acc0-463d-b4a2-a76cfb683bc1",
        email: "john2@gmail.com",
        password: "$2b$10$XVkvJvRM14ZUZXvk1qQdHe99tYA38GdQboD1WyUs4tv/TMkYUSfzS",
        profilePicture: "https://tarotcardtestjob.s3.ap-south-1.amazonaws.com/uploads/profile-1695644848211.jpg",
        firstName: "john",
        lastName: "doe",
        role: "Reader",
        createdAt: "2023-09-25T12:27:29.127Z",
        updatedAt: "2023-09-25T12:27:29.127Z",
        deletedAt: null,
    },
    "2": {
        id: "261b25e0-ede4-465e-b6bc-87445ad28422",
        email: "john3@gmail.com",
        password: "$2b$10$IKnErucCMONJaIFo7ULKoeOQhnNTUWB/V190Zgwczg1.5XOwMGkUa",
        profilePicture: "https://tarotcardtestjob.s3.ap-south-1.amazonaws.com/uploads/profile-1695646798031.jpg",
        firstName: "john",
        lastName: "doe",
        role: "Reader",
        createdAt: "2023-09-25T12:59:58.825Z",
        updatedAt: "2023-09-25T12:59:58.825Z",
        deletedAt: null,
    },
    "3": {
        id: "4ad42385-3fd7-45fa-833f-1ba0c00e2f6a",
        email: "john@gmail.com",
        password: "$2b$10$BcnSi8qwmf1Q5kSftINPV..3W4Mfb.8IMzZSdfedZKF4SMXxIr5YO",
        profilePicture: "https://s3.amazonaws.com/tarotcardtestjob/uploads/profile-1695635052801.jpg",
        firstName: "john",
        lastName: "doe",
        role: "Reader",
        createdAt: "2023-09-25T09:44:13.539Z",
        updatedAt: "2023-09-25T09:44:13.539Z",
        deletedAt: null,
    },
};
describe("Reader paginated API", () => {
    test("should return error for no page number", async () => {
        try {
            await _service_1.UserService.getAllReaders(NaN, 10);
        }
        catch (error) {
            expect(error).toBeInstanceOf(_exceptions_1.BadRequestExceptionError);
            expect(error.message).toBe("Page number must be a number");
        }
    });
    test("should return error for no page size", async () => {
        try {
            await _service_1.UserService.getAllReaders(10, NaN);
        }
        catch (error) {
            expect(error).toBeInstanceOf(_exceptions_1.BadRequestExceptionError);
            expect(error.message).toBe("Page size must be a number");
        }
    });
    test("should return error for non integer page number", async () => {
        try {
            await _service_1.UserService.getAllReaders(10.9, 10);
        }
        catch (error) {
            expect(error).toBeInstanceOf(_exceptions_1.BadRequestExceptionError);
            expect(error.message).toBe("Page number must be an integer");
        }
    });
    test("should return error for non integer page size", async () => {
        try {
            await _service_1.UserService.getAllReaders(10, 10.9);
        }
        catch (error) {
            expect(error).toBeInstanceOf(_exceptions_1.BadRequestExceptionError);
            expect(error.message).toBe("Page size must be an integer");
        }
    });
    test("should return error for zero page number", async () => {
        try {
            await _service_1.UserService.getAllReaders(0, 10);
        }
        catch (error) {
            expect(error).toBeInstanceOf(_exceptions_1.BadRequestExceptionError);
            expect(error.message).toBe("Page number must be greater than or equal to 1");
        }
    });
    test("should return error for zero page size", async () => {
        try {
            await _service_1.UserService.getAllReaders(10, 0);
        }
        catch (error) {
            expect(error).toBeInstanceOf(_exceptions_1.BadRequestExceptionError);
            expect(error.message).toBe("Page size must be greater than or equal to 1");
        }
    });
    test("should return reader data", async () => {
        const spyCount = jest.spyOn(_repo_1.UserRepo, "countAllReaders");
        models_1.models.user.findAndCountAll = jest.fn().mockResolvedValue({ count: 4 });
        const spyData = jest.spyOn(_repo_1.UserRepo, "getPaginatedReaders");
        models_1.models.user.findAll = jest.fn().mockResolvedValue(mockDataValue);
        const response = await _service_1.UserService.getAllReaders(1, 4);
        expect(spyCount).toBeCalledTimes(1);
        expect(models_1.models.user.findAndCountAll).toBeCalledWith({
            where: {
                role: "Reader",
            },
        });
        expect(spyData).toHaveBeenCalledTimes(1);
        expect(models_1.models.user.findAll).toBeCalledWith({
            where: {
                role: "Reader",
            },
            order: [["email", "ASC"]],
            offset: 0,
            limit: 4,
        });
        expect(response).toStrictEqual({
            ...mockDataValue,
            meta: {
                totalPages: 1,
                currentPage: 1,
                previousPage: null,
                nextPage: null,
                pageSize: 4,
            },
        });
    });
});
