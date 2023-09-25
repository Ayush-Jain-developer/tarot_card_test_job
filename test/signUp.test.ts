import UserService from "@service";
import { BadRequestExceptionError } from "@exceptions";
import { ReaderBioRepo, UserRepo } from "@repo";
import bcrypt from "bcrypt";
import * as utils from "@utils";
import Messages from "@messages";
import fs from "fs";
import { Request } from "express";

const actualMockData = {
  email: "john@gmail.com",
  password: "12345678",
  confirmPassword: "12345678",
  firstName: "John",
  lastName: "Doe",
  role: "Reader",
};
const returnMockData = {
  id: "4d03f61c-9912-418a-8809-91fbb73ceb05",
  email: "john@gmail.com",
  password: "$2b$10$yCmy4S009zirBbstArf8d.1XveXJIfmV7xplACID.XI5n/uSMJokK",
  firstName: "John",
  lastName: "Doe",
  role: "Reader",
  updatedAt: "2023-09-21T09:02:02.717Z",
  createdAt: "2023-09-21T09:02:02.717Z",
  profilePicture: null,
  deletedAt: null,
};

const returnMockDataWithProfile = {
  id: "4d03f61c-9912-418a-8809-91fbb73ceb05",
  email: "john@gmail.com",
  password: "$2b$10$yCmy4S009zirBbstArf8d.1XveXJIfmV7xplACID.XI5n/uSMJokK",
  firstName: "John",
  lastName: "Doe",
  role: "Reader",
  updatedAt: "2023-09-21T09:02:02.717Z",
  createdAt: "2023-09-21T09:02:02.717Z",
  profilePicture:
    "https://tarotcardtestjob.s3.ap-south-1.amazonaws.com/path/to/file",
  deletedAt: null,
};

const wrongEmailMockData = {
  email: "johngmail.com",
  password: "12345678",
  confirmPassword: "12345678",
  firstName: "John",
  lastName: "Doe",
  role: "Reader",
};

const noRoleMockData = {
  email: "john@gmail.com",
  password: "12345678",
  confirmPassword: "12345678",
  firstName: "John ",
  lastName: "Doe",
  role: "",
};

const mockTokens = {
  accessToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRkMDNmNjFjLTk5MTItNDE4YS04O",
  refreshToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.wvvwgwegq3r3443y66ujyteebgrtwb5yj4yg4",
};

const noPasswordMockData = {
  email: "john@gmail.com",
  password: "",
  confirmPassword: "12345678",
  firstName: "John ",
  lastName: "Doe",
  role: "Reader",
};

const shortPasswordMockData = {
  email: "john@gmail.com",
  password: "1234567",
  confirmPassword: "12345678",
  firstName: "John ",
  lastName: "Doe",
  role: "Reader",
};

const passwordUnMatchMockData = {
  email: "john@gmail.com",
  password: "12345678",
  confirmPassword: "1234567",
  firstName: "John ",
  lastName: "Doe",
  role: "Reader",
};

describe("signUp API", () => {
  test("should return error for email", async () => {
    fs.unlinkSync = jest.fn().mockImplementation(() => true);
    try {
      const mockReq = {
        file: {
          path: "path/to/file",
        },
      } as Request;
      await UserService.signUp(mockReq, wrongEmailMockData);
    } catch (error: any) {
      expect(fs.unlinkSync).toBeCalledTimes(1);
      expect(fs.unlinkSync).toBeCalledWith("path/to/file");
      expect(error).toBeInstanceOf(BadRequestExceptionError);
      expect(error.message).toBe("Email must be a valid email");
    }
  });

  test("should return error for email already exist", async () => {
    const mockFindUser = jest.fn();
    UserRepo.findUser = mockFindUser.mockResolvedValue(returnMockData);
    fs.unlinkSync = jest.fn().mockImplementation(() => true);
    try {
      const mockReq = {
        file: {
          path: "path/to/file",
        },
      } as Request;
      await UserService.signUp(mockReq, actualMockData);
    } catch (error: any) {
      expect(fs.unlinkSync).toBeCalledTimes(1);
      expect(fs.unlinkSync).toBeCalledWith("path/to/file");
      expect(error).toBeInstanceOf(BadRequestExceptionError);
      expect(error.message).toBe(Messages.emailExist);
    }
  });

  test("should return error for no role", async () => {
    const mockFindUser = jest.fn();
    UserRepo.findUser = mockFindUser.mockResolvedValue(null);
    fs.unlinkSync = jest.fn().mockImplementation(() => true);
    try {
      const mockReq = {
        file: {
          path: "path/to/file",
        },
      } as Request;
      await UserService.signUp(mockReq, noRoleMockData);
    } catch (error: any) {
      expect(fs.unlinkSync).toBeCalledTimes(1);
      expect(fs.unlinkSync).toBeCalledWith("path/to/file");
      expect(error).toBeInstanceOf(BadRequestExceptionError);
      expect(error.message).toBe("Role is not allowed to be empty");
    }
  });

  test("should return error for no password", async () => {
    const mockFindUser = jest.fn();
    UserRepo.findUser = mockFindUser.mockResolvedValue(null);
    fs.unlinkSync = jest.fn().mockImplementation(() => true);
    try {
      const mockReq = {
        file: {
          path: "path/to/file",
        },
      } as Request;
      await UserService.signUp(mockReq, noPasswordMockData);
    } catch (error: any) {
      expect(fs.unlinkSync).toBeCalledTimes(1);
      expect(fs.unlinkSync).toBeCalledWith("path/to/file");
      expect(error).toBeInstanceOf(BadRequestExceptionError);
      expect(error.message).toBe("Password is not allowed to be empty");
    }
  });

  test("should return error for password length", async () => {
    const mockFindUser = jest.fn();
    UserRepo.findUser = mockFindUser.mockResolvedValue(null);
    fs.unlinkSync = jest.fn().mockImplementation(() => true);
    try {
      const mockReq = {
        file: {
          path: "path/to/file",
        },
      } as Request;
      await UserService.signUp(mockReq, shortPasswordMockData);
    } catch (error: any) {
      expect(fs.unlinkSync).toBeCalledTimes(1);
      expect(fs.unlinkSync).toBeCalledWith("path/to/file");
      expect(error).toBeInstanceOf(BadRequestExceptionError);
      expect(error.message).toBe(
        "Password length must be at least 8 characters long",
      );
    }
  });

  test("should return error for unmatched password and confirm password", async () => {
    const mockFindUser = jest.fn();
    UserRepo.findUser = mockFindUser.mockResolvedValue(null);
    fs.unlinkSync = jest.fn().mockImplementation(() => true);
    try {
      const mockReq = {
        file: {
          path: "path/to/file",
        },
      } as Request;
      await UserService.signUp(mockReq, passwordUnMatchMockData);
    } catch (error: any) {
      expect(fs.unlinkSync).toBeCalledTimes(1);
      expect(fs.unlinkSync).toBeCalledWith("path/to/file");
      expect(error).toBeInstanceOf(BadRequestExceptionError);
      expect(error.message).toBe(Messages.passwordNotMatch);
    }
  });

  beforeEach(() => {});

  test("should return user with profilePicture and token", async () => {
    const mockFindUser = jest.fn();
    UserRepo.findUser = mockFindUser.mockResolvedValue(null);
    const mockCreateUser = jest.fn();
    UserRepo.createUser = mockCreateUser.mockResolvedValue({
      dataValues: returnMockData,
    });
    const mockCreateReaderBio = jest.fn();
    ReaderBioRepo.createReaderBio = mockCreateReaderBio.mockResolvedValue(null);
    bcrypt.genSalt = jest.fn();
    bcrypt.hash = jest.fn();
    utils.Jwt.createTokens = jest.fn().mockReturnValue(mockTokens);
    const spyUpload = jest.spyOn(utils, "uploadFile");
    fs.readFileSync = jest.fn().mockImplementation(() => "Mock File Data");
    fs.unlinkSync = jest.fn().mockImplementation(() => true);
    const mockReq = {
      file: {
        path: "path/to/file",
      },
    } as Request;
    const response = await UserService.signUp(mockReq, actualMockData);
    expect(spyUpload).toBeCalledTimes(1);
    expect(spyUpload).toBeCalledWith("path/to/file");
    expect(fs.readFileSync).toBeCalled();
    expect(fs.readFileSync).toBeCalledWith("path/to/file");
    expect(fs.unlinkSync).toBeCalledTimes(1);
    expect(fs.unlinkSync).toBeCalledWith("path/to/file");
    expect(bcrypt.genSalt).toHaveBeenCalled();
    expect(bcrypt.hash).toHaveBeenCalled();
    expect(ReaderBioRepo.createReaderBio).toHaveBeenCalled();
    expect(response.profilePicture).toBe(null);
    expect(response).toStrictEqual({
      ...returnMockDataWithProfile,
      ...mockTokens,
      refreshTokenExpiry: Messages.refreshTokenExpiry,
    });
  });

  test("should return user with token", async () => {
    const mockFindUser = jest.fn();
    UserRepo.findUser = mockFindUser.mockResolvedValue(null);
    const mockCreateUser = jest.fn();
    UserRepo.createUser = mockCreateUser.mockResolvedValue({
      dataValues: returnMockData,
    });
    const mockCreateReaderBio = jest.fn();
    ReaderBioRepo.createReaderBio = mockCreateReaderBio.mockResolvedValue(null);
    bcrypt.genSalt = jest.fn();
    bcrypt.hash = jest.fn();
    utils.Jwt.createTokens = jest.fn().mockReturnValue(mockTokens);
    const mockReq = {} as Request;
    const spyUpload = jest.spyOn(utils, "uploadFile");
    const spyFs = jest.spyOn(fs, "readFileSync");
    const response = await UserService.signUp(mockReq, actualMockData);
    expect(spyUpload).not.toBeCalled();
    expect(spyFs).not.toBeCalled();
    expect(bcrypt.genSalt).toHaveBeenCalled();
    expect(bcrypt.hash).toHaveBeenCalled();
    expect(ReaderBioRepo.createReaderBio).toHaveBeenCalled();
    expect(response.profilePicture).toBe(null);
    expect(response).toStrictEqual({
      ...returnMockData,
      ...mockTokens,
      refreshTokenExpiry: Messages.refreshTokenExpiry,
    });
  });
});
