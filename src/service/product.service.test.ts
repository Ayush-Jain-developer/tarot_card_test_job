import {
  BadRequestExceptionError,
  UnauthorizedExceptionError,
} from "@exceptions";
import Messages from "@messages";
import { productsRepo } from "@repo";
import { ProductsService } from "@service";

const mockNoReaderIdData = {
  readerId: "",
  name: "New Service",
  amount: 34.56,
  role: "Reader",
};

const mockNoNameData = {
  readerId: "4d03f61c-9912-418a-8809-91fbb73ceb05",
  name: "",
  amount: 34.56,
  role: "Reader",
};

const mockDataLessAmount = {
  readerId: "4d03f61c-9912-418a-8809-91fbb73ceb05",
  name: "New service",
  amount: -1,
  role: "Reader",
};

const mockDataMoreAmount = {
  readerId: "4d03f61c-9912-418a-8809-91fbb73ceb05",
  name: "New service",
  amount: 10000000,
  role: "Reader",
};

const mockNoRoleData = {
  readerId: "4d03f61c-9912-418a-8809-91fbb73ceb05",
  name: "New service",
  amount: 34.56,
  role: "",
};

const mockWrongRoleData = {
  readerId: "4d03f61c-9912-418a-8809-91fbb73ceb05",
  name: "New service",
  amount: 34.56,
  role: "Client",
};

const mockCorrectData = {
  readerId: "4d03f61c-9912-418a-8809-91fbb73ceb05",
  name: "New service",
  amount: 34.56,
  role: "Reader",
};

const mockFinalData = {
  id: "1c75caa6-b1a0-4878-80ef-1576b413996b",
  readerId: "4d03f61c-9912-418a-8809-91fbb73ceb05",
  name: "New service",
  amount: 34.56,
  role: "Reader",
  currency: "USD",
  updatedAt: "2023-09-28T10:40:54.372Z",
  createdAt: "2023-09-28T10:40:54.372Z",
};

describe("Add new product API", () => {
  test("should return error for no reader ID", async () => {
    try {
      await ProductsService.createProduct(mockNoReaderIdData);
    } catch (error: any) {
      expect(error).toBeInstanceOf(BadRequestExceptionError);
      expect(error.message).toBe("Reader ID is not allowed to be empty");
    }
  });

  test("should return error for no name", async () => {
    try {
      await ProductsService.createProduct(mockNoNameData);
    } catch (error: any) {
      expect(error).toBeInstanceOf(BadRequestExceptionError);
      expect(error.message).toBe("Name is not allowed to be empty");
    }
  });

  test("should return error for amount less than 0", async () => {
    try {
      await ProductsService.createProduct(mockDataLessAmount);
    } catch (error: any) {
      expect(error).toBeInstanceOf(BadRequestExceptionError);
      expect(error.message).toBe("Amount must be greater than or equal to 0");
    }
  });

  test("should return error for amount more than 9999999.99", async () => {
    try {
      await ProductsService.createProduct(mockDataMoreAmount);
    } catch (error: any) {
      expect(error).toBeInstanceOf(BadRequestExceptionError);
      expect(error.message).toBe(
        "Amount must be less than or equal to 9999999.99",
      );
    }
  });

  test("should return error for no role", async () => {
    try {
      await ProductsService.createProduct(mockNoRoleData);
    } catch (error: any) {
      expect(error).toBeInstanceOf(BadRequestExceptionError);
      expect(error.message).toBe("Role is not allowed to be empty");
    }
  });

  test("should return error for wrong role", async () => {
    try {
      await ProductsService.createProduct(mockWrongRoleData);
    } catch (error: any) {
      expect(error).toBeInstanceOf(UnauthorizedExceptionError);
      expect(error.message).toBe(Messages.wrongUserRole);
    }
  });

  test("should return new service added data successfully", async () => {
    productsRepo.createProduct = jest
      .fn()
      .mockResolvedValue({ dataValues: mockFinalData });
    const response = await ProductsService.createProduct(mockCorrectData);
    expect(productsRepo.createProduct).toHaveBeenCalledTimes(1);
    expect(response).toStrictEqual(mockFinalData);
  });
});
