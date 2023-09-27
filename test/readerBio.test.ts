import { UserService } from "@service";
import { ReaderBioRepo, UserRepo } from "@repo";
import {
  BadRequestExceptionError,
  UnauthorizedExceptionError,
} from "@exceptions";
import Messages from "@messages";
import fs from "fs";

const mockWrongRoleUserData = {
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

const mockDataForUpdate = {
  id: "4d03f61c-9912-418a-8809-91fbb73ceb05",
  bio: "Welcome to the mystical world of Tarot! I'm your trusted Tarot card reader and spiritual guide. With a deck of ancient wisdom in my hands, I unlock the secrets of your past, present, and future.",
  specialities: [
    "Career and Finance: Focusing on career decisions, financial stability, and helping clients make informed choices about their professional lives.",
    "Spiritual Guidance: Providing spiritual insight, connecting clients with their inner selves, and assisting in their spiritual journeys.",
    "Life Path and Purpose: Assisting clients in discovering their life's purpose, clarifying their goals, and aligning with their true path.",
  ],
};

const updatedMockData = {
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

const noBioMockData = {
  id: "4d03f61c-9912-418a-8809-91fbb73ceb05",
  bio: "",
  specialities: [
    "Career and Finance: Focusing on career decisions, financial stability, and helping clients make informed choices about their professional lives.",
    "Spiritual Guidance: Providing spiritual insight, connecting clients with their inner selves, and assisting in their spiritual journeys.",
    "Life Path and Purpose: Assisting clients in discovering their life's purpose, clarifying their goals, and aligning with their true path.",
  ],
};

const noSpecialitiesMockData = {
  id: "4d03f61c-9912-418a-8809-91fbb73ceb05",
  bio: "Welcome to the mystical world of Tarot! I'm your trusted Tarot card reader and spiritual guide. With a deck of ancient wisdom in my hands, I unlock the secrets of your past, present, and future.",
  specialities: [],
};

describe("Reader bio API", () => {
  test("should return error for no bio", async () => {
    fs.unlinkSync = jest.fn().mockImplementation(() => true);
    try {
      await UserService.updateReaderProfile(noBioMockData);
    } catch (error: any) {
      expect(error).toBeInstanceOf(BadRequestExceptionError);
      expect(error.message).toBe("Bio is not allowed to be empty");
    }
  });

  test("should return error for no specialities", async () => {
    fs.unlinkSync = jest.fn().mockImplementation(() => true);
    try {
      await UserService.updateReaderProfile(noSpecialitiesMockData);
    } catch (error: any) {
      expect(error).toBeInstanceOf(BadRequestExceptionError);
      expect(error.message).toBe("Specialities must contain at least 1 items");
    }
  });

  test("should return error for wrong user role", async () => {
    const mockFindUserById = jest.fn();
    UserRepo.findUserByID = mockFindUserById.mockResolvedValue({
      dataValues: mockWrongRoleUserData,
    });
    try {
      await UserService.updateReaderProfile(mockDataForUpdate);
    } catch (error: any) {
      expect(error).toBeInstanceOf(UnauthorizedExceptionError);
      expect(error.message).toBe(Messages.wrongUserRole);
    }
  });

  test("should return updated reader profile", async () => {
    const mockFindUserById = jest.fn();
    UserRepo.findUserByID = mockFindUserById.mockResolvedValue({
      dataValues: mockUserData,
    });
    const mockUpdateReaderProfile = jest.fn();
    ReaderBioRepo.updateReaderProfile =
      mockUpdateReaderProfile.mockResolvedValue(updatedMockData);
    const response = await UserService.updateReaderProfile(mockDataForUpdate);
    expect(response).toStrictEqual(updatedMockData);
  });
});
