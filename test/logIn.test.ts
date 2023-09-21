import UserService from "@service";
import {
  BadRequestExceptionError,
  NotFoundExceptionError,
  UnauthorizedExceptionError,
} from "@exceptions";
import { UserRepo } from "@repo";
import Jwt from "@utils";

const actualMockData = {
  email: "john@gmail.com",
  password: "12345678",
};

const wrongEmailMockData = {
  email: "johngmail.com",
  password: "12345678",
};

const noPasswordMockData = {
  email: "john@gmail.com",
  password: "",
};

const wrongPasswordMockData = {
  email: "john@gmail.com",
  password: "1234567",
};

const mockToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRkMDNmNjFjLTk5MTItNDE4YS04O";

const mockUserData = {
  id: "4d03f61c-9912-418a-8809-91fbb73ceb05",
  email: "john@gmail.com",
  password: "$2b$10$yCmy4S009zirBbstArf8d.1XveXJIfmV7xplACID.XI5n/uSMJokK",
  firstName: "John ",
  lastName: "Doe",
  role: "Reader",
  updatedAt: "2023-09-21T09:02:02.717Z",
  createdAt: "2023-09-21T09:02:02.717Z",
  profilePicture: null,
  deletedAt: null,
};

describe("logIn API", () => {
  test("should return error for invalid email", async () => {
    try {
      await UserService.logIn(wrongEmailMockData);
    } catch (error: any) {
      expect(error).toBeInstanceOf(BadRequestExceptionError);
      expect(error.message).toBe("Email must be a valid email");
    }
  });

  test("should return error for no password", async () => {
    try {
      await UserService.logIn(noPasswordMockData);
    } catch (error: any) {
      expect(error).toBeInstanceOf(BadRequestExceptionError);
      expect(error.message).toBe("Password is not allowed to be empty");
    }
  });

  test("should return error for no user", async () => {
    const mockFindUser = jest.fn();
    UserRepo.findUser = mockFindUser.mockResolvedValue(null);
    try {
      await UserService.logIn(actualMockData);
    } catch (error: any) {
      expect(error).toBeInstanceOf(NotFoundExceptionError);
      expect(error.message).toBe("User not found. Please signUp");
    }
  });

  test("should return error for password incorrect", async () => {
    const mockFindUser = jest.fn();
    UserRepo.findUser = mockFindUser.mockResolvedValue({
      dataValues: mockUserData,
    });
    try {
      await UserService.logIn(wrongPasswordMockData);
    } catch (error: any) {
      expect(error).toBeInstanceOf(UnauthorizedExceptionError);
      expect(error.message).toBe("Password incorrect");
    }
  });

  test("should return login status with token", async () => {
    const mockFindUser = jest.fn();
    UserRepo.findUser = mockFindUser.mockResolvedValue({
      dataValues: mockUserData,
    });
    const mockCreateToken = jest.fn();
    Jwt.createToken = mockCreateToken.mockReturnValue(mockToken);
    const response = await UserService.logIn(actualMockData);
    expect(response.token).toBe(mockToken);
  });
});
