import { UserService } from "@service";
import { Request } from "express";
import {
  BadRequestExceptionError,
  NotFoundExceptionError,
  UnauthorizedExceptionError,
} from "@exceptions";
import { ReaderBioRepo, UserRepo } from "@repo";
import { Jwt } from "@utils";
import bcrypt from "bcrypt";
import Messages from "@messages";
import fs from "fs";

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

const mockTokens = {
  accessToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRkMDNmNjFjLTk5MTItNDE4YS04O",
  refreshToken:
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.wvvwgwegq3r3443y66ujyteebgrtwb5yj4yg4",
};

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

const mockUserDataForClient = {
  id: "4d03f61c-9912-418a-8809-91fbb73ceb05",
  email: "john@gmail.com",
  password: "$2b$10$yCmy4S009zirBbstArf8d.1XveXJIfmV7xplACID.XI5n/uSMJokK",
  firstName: "John ",
  lastName: "Doe",
  role: "Client",
  updatedAt: "2023-09-21T09:02:02.717Z",
  createdAt: "2023-09-21T09:02:02.717Z",
  profilePicture: null,
  deletedAt: null,
};

const mockReaderBioData = {
  id: "4d03f61c-9912-418a-8809-91fbb73ceb05",
  bio: "Welcome to the mystical world of Tarot! I'm your trusted Tarot card reader and spiritual guide. With a deck of ancient wisdom in my hands, I unlock the secrets of your past, present, and future.",
  specialities: [
    "Career and Finance: Focusing on career decisions, financial stability, and helping clients make informed choices about their professional lives.",
    "Spiritual Guidance: Providing spiritual insight, connecting clients with their inner selves, and assisting in their spiritual journeys.",
    "Life Path and Purpose: Assisting clients in discovering their life's purpose, clarifying their goals, and aligning with their true path.",
  ],
  updatedAt: "2023-09-21T09:02:02.717Z",
  createdAt: "2023-10-21T09:02:02.717Z",
  deletedAt: null,
};

const mockUnUpdatedReaderBioData = {
  id: "4d03f61c-9912-418a-8809-91fbb73ceb05",
  bio: "ebgfsbrgnbgnghdnthnghtdnhgtn",
  specialities: [],
  updatedAt: "2023-09-21T09:02:02.717Z",
  createdAt: "2023-10-21T09:02:02.717Z",
  deletedAt: null,
};

describe("logIn API", () => {
  test("should return error for invalid email", async () => {
    fs.unlinkSync = jest.fn().mockImplementation(() => true);
    try {
      const mockReq = {} as Request;
      await UserService.logIn(mockReq, wrongEmailMockData);
    } catch (error: any) {
      expect(fs.unlinkSync).not.toBeCalled();
      expect(error).toBeInstanceOf(BadRequestExceptionError);
      expect(error.message).toBe("Email must be a valid email");
    }
  });

  test("should return error for no password", async () => {
    fs.unlinkSync = jest.fn().mockImplementation(() => true);
    try {
      const mockReq = {} as Request;
      await UserService.logIn(mockReq, noPasswordMockData);
    } catch (error: any) {
      expect(fs.unlinkSync).not.toBeCalled();
      expect(error).toBeInstanceOf(BadRequestExceptionError);
      expect(error.message).toBe("Password is not allowed to be empty");
    }
  });

  test("should return error for no user", async () => {
    const mockFindUser = jest.fn();
    UserRepo.findUser = mockFindUser.mockResolvedValue(null);
    try {
      const mockReq = {} as Request;
      await UserService.logIn(mockReq, actualMockData);
    } catch (error: any) {
      expect(error).toBeInstanceOf(NotFoundExceptionError);
      expect(error.message).toBe(Messages.noUserExist);
    }
  });

  test("should return error for password incorrect", async () => {
    const mockFindUser = jest.fn();
    UserRepo.findUser = mockFindUser.mockResolvedValue({
      dataValues: mockUserData,
    });
    try {
      const mockReq = {} as Request;
      await UserService.logIn(mockReq, wrongPasswordMockData);
    } catch (error: any) {
      expect(error).toBeInstanceOf(UnauthorizedExceptionError);
      expect(error.message).toBe(Messages.wrongPassword);
    }
  });

  test("should return login status with token and profileUpdated status true", async () => {
    const mockFindUser = jest.fn();
    UserRepo.findUser = mockFindUser.mockResolvedValue({
      dataValues: mockUserData,
    });
    const spyBcrypt = jest.spyOn(bcrypt, "compare");
    const mockCreateToken = jest.fn();
    Jwt.createTokens = mockCreateToken.mockReturnValue(mockTokens);
    const mockReaderBio = jest.fn();
    ReaderBioRepo.findReaderBioById =
      mockReaderBio.mockResolvedValue(mockReaderBioData);
    const mockReq = {} as Request;
    const response = await UserService.logIn(mockReq, actualMockData);
    expect(spyBcrypt).toHaveBeenCalledTimes(1);
    expect(spyBcrypt).toHaveBeenCalledWith(
      actualMockData.password,
      mockUserData.password,
    );
    expect(response.accessToken).toBe(mockTokens.accessToken);
    expect(response.refreshToken).toBe(mockTokens.refreshToken);
    expect(response.profileUpdated).toBe(true);
  });

  test("should return login status with tokan and profileUpdated status false", async () => {
    const mockFindUser = jest.fn();
    UserRepo.findUser = mockFindUser.mockResolvedValue({
      dataValues: mockUserData,
    });
    const spyBcrypt = jest.spyOn(bcrypt, "compare");
    const mockCreateToken = jest.fn();
    Jwt.createTokens = mockCreateToken.mockReturnValue(mockTokens);
    const mockReaderBio = jest.fn();
    ReaderBioRepo.findReaderBioById = mockReaderBio.mockResolvedValue(
      mockUnUpdatedReaderBioData,
    );
    const mockReq = {} as Request;
    const response = await UserService.logIn(mockReq, actualMockData);
    expect(spyBcrypt).toHaveBeenCalledTimes(1);
    expect(spyBcrypt).toHaveBeenCalledWith(
      actualMockData.password,
      mockUserData.password,
    );
    expect(response.accessToken).toBe(mockTokens.accessToken);
    expect(response.refreshToken).toBe(mockTokens.refreshToken);
    expect(response.profileUpdated).toBe(false);
  });

  test("should return login status with token and without profileUpdated field", async () => {
    const mockFindUser = jest.fn();
    UserRepo.findUser = mockFindUser.mockResolvedValue({
      dataValues: mockUserDataForClient,
    });
    const spyBcrypt = jest.spyOn(bcrypt, "compare");
    const mockCreateToken = jest.fn();
    Jwt.createTokens = mockCreateToken.mockReturnValue(mockTokens);
    const mockReq = {} as Request;
    const response = await UserService.logIn(mockReq, actualMockData);
    expect(spyBcrypt).toHaveBeenCalledTimes(1);
    expect(spyBcrypt).toHaveBeenCalledWith(
      actualMockData.password,
      mockUserDataForClient.password,
    );
    expect(response.accessToken).toBe(mockTokens.accessToken);
    expect(response.refreshToken).toBe(mockTokens.refreshToken);
    expect(response.profileUpdated).toBeFalsy();
  });
});
