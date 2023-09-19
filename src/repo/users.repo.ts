import { models } from "@database/models";
import UserInterface from "@interfaces";

export default class UserRepo {
  static async createUser(
    data: Omit<
      UserInterface,
      | "id"
      | "profilePicture"
      | "confirmPassword"
      | "createdAt"
      | "updatedAt"
      | "deletedAt"
    >,
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
}
