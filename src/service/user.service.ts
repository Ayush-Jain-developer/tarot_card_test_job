import Joi from "joi";
import {
  LoginResDataInterface,
  ReaderBioInterface,
  UserInterface,
} from "@interfaces";
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
    const token = Jwt.createTokens({ id: createdUser.dataValues.id });

    return {
      ...createdUser.dataValues,
      ...token,
      refreshTokenExpiry: Messages.refreshTokenExpiry,
    };
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
    const token = Jwt.createTokens({ id: user.dataValues.id });
    const responseData: LoginResDataInterface = {
      id: user.dataValues.id,
      role: user.dataValues.role,
      accessToken: token.accessToken,
      refreshToken: token.refreshToken,
      refreshTokenExpiry: Messages.refreshTokenExpiry,
    };
    if (user.dataValues.role === "Reader") {
      const readerBio = (await ReaderBioRepo.findReaderBioById(
        user.dataValues.id,
      )) as unknown as ReaderBioInterface;
      if (readerBio.bio && readerBio.specialities.length) {
        responseData.profileUpdated = true;
      } else {
        responseData.profileUpdated = false;
      }
    }
    return responseData;
  }

  static async updateReaderProfile(data: ReaderBioInterface) {
    ValidateFields.stringRequired(data.bio, "Bio");
    ValidateFields.arrayRequired(data.specialities, "Specialities");
    const user = await UserRepo.findUserByID(data.id);
    if (user?.dataValues.role !== "Reader") {
      throw new UnauthorizedExceptionError(Messages.wrongUserRole);
    }
    const updatedProfile = await ReaderBioRepo.updateReaderProfile(data);
    return updatedProfile;
  }

  static async getUser(userId: string) {
    const user = await UserRepo.findUserByID(userId);
    if (!user) {
      throw new BadRequestExceptionError(Messages.noUserExist);
    }
    let responseData;
    if (user?.dataValues.role === "Reader") {
      const userBio = await ReaderBioRepo.findReaderBioById(userId);
      responseData = {
        id: user.dataValues.id,
        email: user.dataValues.email,
        profilePicture: user.dataValues.profilePicture,
        firstName: user.dataValues.firstName,
        lastName: user.dataValues.lastName,
        role: user.dataValues.role,
        bio: userBio?.dataValues.bio,
        specialities: userBio?.dataValues.specialities,
      };
    } else {
      responseData = {
        id: user?.dataValues.id,
        email: user?.dataValues.email,
        profilePicture: user?.dataValues.profilePicture,
        firstName: user?.dataValues.firstName,
        lastName: user?.dataValues.lastName,
        role: user?.dataValues.role,
      };
    }
    return responseData;
  }
}

export default UserService;
