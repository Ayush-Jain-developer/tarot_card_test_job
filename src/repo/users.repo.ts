import { models } from "@database/models";
import { UserInterface } from "@interfaces";

export default class UserRepo {
  static async createUser(
    data: Omit<UserInterface, "id" | "profilePicture" | "confirmPassword">,
  ) {
    return models.user.create(data);
  }

  static async findUser(email: string) {
    return models.user.findOne({
      where: {
        email,
      },
    });
  }

  static async findUserByID(id: string) {
    return models.user.findByPk(id);
  }

  static async countAllReaders() {
    return models.user.findAndCountAll({
      where: {
        role: "Reader",
      },
    });
  }

  static async getPaginatedReaders(offset: number, limit: number) {
    return models.user.findAll({
      where: {
        role: "Reader",
      },
      order: [["email", "ASC"]],
      offset,
      limit,
    });
  }
}
