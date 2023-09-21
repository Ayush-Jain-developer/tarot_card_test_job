import Joi from "joi";
import { ReaderBioInterface, UserInterface } from "@interfaces";
import {
  BadRequestExceptionError,
  NotFoundExceptionError,
  UnauthorizedExceptionError,
} from "@exceptions";
import { ValidateFields } from "@helper";
import bcrypt from "bcrypt";
import { UserRepo, ReaderBioRepo } from "@repo";
import Messages from "@messages";
import Jwt from "@utils";

class UserService {
  static async signUp(data: UserInterface) {
    ValidateFields.emailValidation(data.email);
    const email = data.email.toLowerCase();
    const user = await UserRepo.findUser(email);
    if (user) {
      throw new BadRequestExceptionError(Messages.emailExist);
    }
    ValidateFields.stringRequired(data.role, "Role");
    const passwordSchema = Joi.string().min(8).max(30).required();
    ValidateFields.passwordValidation(data.password, passwordSchema);
    if (data.password !== data.confirmPassword) {
      throw new BadRequestExceptionError(Messages.passwordNotMatch);
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(data.password, salt);
    const userData = {
      email,
      password: hash,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role,
    };
    const createdUser = await UserRepo.createUser(userData);
    if (data.role === "Reader") {
      await ReaderBioRepo.createReaderBio({ id: createdUser.dataValues.id });
    }
    const token = Jwt.createToken(createdUser.dataValues);

    return { ...createdUser.dataValues, token };
  }

  static async logIn(data: { email: string; password: string }) {
    ValidateFields.emailValidation(data.email);
    const passwordSchema = Joi.string().required();
    ValidateFields.passwordValidation(data.password, passwordSchema);
    const email = data.email.toLowerCase();
    const user = await UserRepo.findUser(email);
    if (!user) {
      throw new NotFoundExceptionError(Messages.noUserExist);
    }
    const comparePassword = await bcrypt.compare(
      data.password,
      user.dataValues.password,
    );
    if (!comparePassword) {
      throw new UnauthorizedExceptionError(Messages.wrongPassword);
    }
    const token = Jwt.createToken(user.dataValues);
    return { token };
  }

  static async updateReaderProfile(data: ReaderBioInterface) {
    const user = await UserRepo.findUserByID(data.id);
    if (user?.dataValues.role !== "Reader") {
      throw new UnauthorizedExceptionError(Messages.wrongUserRole);
    }
    const updatedProfile = await ReaderBioRepo.updateReaderProfile(data);
    return updatedProfile;
  }
}

export default UserService;
