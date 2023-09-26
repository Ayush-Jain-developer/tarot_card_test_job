import { BadRequestExceptionError } from "@exceptions";
import Messages from "@messages";
import { ReaderBioRepo, UserRepo } from "@repo";
import { UserService } from "@service";

const mockReaderData = {
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

const mockReaderBio = {
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

const mockReaderResponse = {
  id: "4d03f61c-9912-418a-8809-91fbb73ceb05",
  email: "john@gmail.com",
  firstName: "John",
  lastName: "Doe",
  role: "Reader",
  profilePicture: null,
  bio: "Welcome to the mystical world of Tarot! I'm your trusted Tarot card reader and spiritual guide. With a deck of ancient wisdom in my hands, I unlock the secrets of your past, present, and future.",
  specialities: [
    "Career and Finance: Focusing on career decisions, financial stability, and helping clients make informed choices about their professional lives.",
    "Spiritual Guidance: Providing spiritual insight, connecting clients with their inner selves, and assisting in their spiritual journeys.",
    "Life Path and Purpose: Assisting clients in discovering their life's purpose, clarifying their goals, and aligning with their true path.",
  ],
};

const mockClientData = {
  id: "4d03f61c-9912-418a-8809-91fbb73ceb05",
  email: "john@gmail.com",
  password: "$2b$10$yCmy4S009zirBbstArf8d.1XveXJIfmV7xplACID.XI5n/uSMJokK",
  firstName: "John",
  lastName: "Doe",
  role: "Client",
  updatedAt: "2023-09-21T09:02:02.717Z",
  createdAt: "2023-09-21T09:02:02.717Z",
  profilePicture: null,
  deletedAt: null,
};

const mockClientResponse = {
  id: "4d03f61c-9912-418a-8809-91fbb73ceb05",
  email: "john@gmail.com",
  firstName: "John",
  lastName: "Doe",
  role: "Client",
  profilePicture: null,
};

describe("user API", () => {
  test("should return error for no such user", async () => {
    const mockUser = jest.fn();
    UserRepo.findUserByID = mockUser.mockResolvedValue(null);
    try {
      await UserService.getUser("123");
    } catch (error: any) {
      expect(error).toBeInstanceOf(BadRequestExceptionError);
      expect(error.message).toBe(Messages.noUserExist);
    }
  });

  test("should return data for Reader", async () => {
    const mockUser = jest.fn();
    UserRepo.findUserByID = mockUser.mockResolvedValue({
      dataValues: mockReaderData,
    });
    const mockBio = jest.fn();
    ReaderBioRepo.findReaderBioById = mockBio.mockResolvedValue({
      dataValues: mockReaderBio,
    });
    const response = await UserService.getUser(
      "4d03f61c-9912-418a-8809-91fbb73ceb05",
    );
    expect(response.id).toBe("4d03f61c-9912-418a-8809-91fbb73ceb05");
    expect(response).toStrictEqual(mockReaderResponse);
  });

  test("should return data for client", async () => {
    const mockUser = jest.fn();
    UserRepo.findUserByID = mockUser.mockResolvedValue({
      dataValues: mockClientData,
    });
    const response = await UserService.getUser(
      "4d03f61c-9912-418a-8809-91fbb73ceb05",
    );
    expect(response.id).toBe("4d03f61c-9912-418a-8809-91fbb73ceb05");
    expect(response).toStrictEqual(mockClientResponse);
  });
});
