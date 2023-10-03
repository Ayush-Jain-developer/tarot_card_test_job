import { models } from "@database/models";
import UserRepo from "./users.repo";

const mockUserData = {
  email: "John@gmail.com",
  password: "12345678",
  confirmPassword: "12345678",
  firstName: "John",
  lastName: "Doe",
  role: "Reader",
};

describe("User repo", () => {
  test("should create new user", async () => {
    models.user.create = jest.fn().mockImplementation(() => "User");
    const result = await UserRepo.createUser(mockUserData);
    expect(models.user.create).toBeCalledWith(mockUserData);
    expect(result).toBe("User");
  });

  test("should find user", async () => {
    models.user.findOne = jest.fn().mockResolvedValue("User");
    const result = await UserRepo.findUser(mockUserData.email);
    expect(models.user.findOne).toBeCalledWith({
      where: { email: mockUserData.email },
    });
    expect(result).toBe("User");
  });

  test("should find user by ID", async () => {
    models.user.findByPk = jest.fn().mockResolvedValue("User");
    const result = await UserRepo.findUserByID(
      "4d03f61c-9912-418a-8809-91fbb73ceb05",
    );
    expect(models.user.findByPk).toBeCalledWith(
      "4d03f61c-9912-418a-8809-91fbb73ceb05",
    );
    expect(result).toBe("User");
  });

  test("should find and count all users", async () => {
    models.user.findAndCountAll = jest.fn().mockResolvedValue(10);
    const result = await UserRepo.countAllReaders();
    expect(models.user.findAndCountAll).toBeCalledWith({
      where: {
        role: "Reader",
      },
    });
    expect(result).toBe(10);
  });

  test("should get paginated users", async () => {
    models.user.findAll = jest.fn().mockResolvedValue("Users");
    const result = await UserRepo.getPaginatedReaders(4, 2);
    expect(models.user.findAll).toBeCalledWith({
      where: {
        role: "Reader",
      },
      order: [["email", "ASC"]],
      offset: 4,
      limit: 2,
    });
    expect(result).toBe("Users");
  });
});
