import UserController from "@controller";
import UserService from "@service";
import UserRepo from "@repo";
import Messages from "@messages";
import { apiResponse } from "@helper";
import { BadRequestExceptionError } from "@exceptions";

const actualMockData = {
  email: "ayushjn@gmail.com",
  password: "12345678",
  confirmPassword: "12345678",
  firstName: "Ayush ",
  lastName: "Jain ",
  role: "Reader",
};

const wrongEmailMockData = {
  email: "ayushjngmail.com",
  password: "12345678",
  confirmPassword: "12345678",
  firstName: "Ayush ",
  lastName: "Jain ",
  role: "Reader",
};

describe("signUp API", () => {
  test("should return error for email", async () => {
    const response = await UserService.signUp(wrongEmailMockData);
    expect(response).toThrow(
      new BadRequestExceptionError("Email must be a valid email."),
    );
  });
});
