/* eslint-disable import/no-extraneous-dependencies */
import Joi from "joi";
import { Request } from "express";
import fs from "fs";
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
import ValidateFields from "@validations";
import bcrypt from "bcrypt";
import { UserRepo, ReaderBioRepo } from "@repo";
import Messages from "@messages";
import { Jwt, uploadFile, stripe } from "@utils";
import { errorMessage } from "@helper";

class UserService {
  static async signUp(req: Request, data: UserInterface) {
    const schema = Joi.string().email().required();
    const validation = schema.validate(data.email);
    if (validation.error) {
      const message = errorMessage(
        "Email",
        validation.error.details[0].message,
      );
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      throw new BadRequestExceptionError(message);
    }
    const StringSchemachema = Joi.string().required();
    const stringValidation = StringSchemachema.validate(data.role);
    if (stringValidation.error) {
      const message = errorMessage(
        "Role",
        stringValidation.error.details[0].message,
      );
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      throw new BadRequestExceptionError(message);
    }
    const passwordSchema = Joi.string().min(8).max(30).required();
    const passwordValidation = passwordSchema.validate(data.password);
    if (passwordValidation.error) {
      const message = errorMessage(
        "Password",
        passwordValidation.error.details[0].message,
      );
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      throw new BadRequestExceptionError(message);
    }
    if (data.password !== data.confirmPassword) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      throw new BadRequestExceptionError(Messages.passwordNotMatch);
    }
    const mail = data.email.toLowerCase();
    const user = await UserRepo.findUser(mail);
    if (user) {
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      throw new BadRequestExceptionError(Messages.emailExist);
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(data.password, salt);
    let responseData: Omit<UserInterface, "id">;
    const {
      id,
      email,
      password,
      confirmPassword,
      createdAt,
      updatedAt,
      deletedAt,
      profilePicture,
      ...userData
    } = data;
    const stripeCustomer = await stripe.customers.create({
      email: mail,
      name: `${data.firstName} ${data.lastName}`,
    });
    if (req.file) {
      await uploadFile(req.file.path);
      fs.unlinkSync(req.file.path);
      const profile: string = process.env.S3_URL + req.file.path;
      responseData = {
        email: mail,
        password: hash,
        ...userData,
        profilePicture: profile,
        stripeCusId: stripeCustomer.id,
      };
    } else {
      responseData = {
        email: mail,
        password: hash,
        ...userData,
        stripeCusId: stripeCustomer.id,
      };
    }
    const createdUser = await UserRepo.createUser(responseData);
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
      stripeCusId: user.dataValues.stripeCusId,
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
    const {
      password,
      confirmPassword,
      createdAt,
      updatedAt,
      deletedAt,
      ...userData
    } = user.dataValues;
    if (user?.dataValues.role === "Reader") {
      const userBio = await ReaderBioRepo.findReaderBioById(userId);
      responseData = {
        ...userData,
        bio: userBio?.dataValues.bio,
        specialities: userBio?.dataValues.specialities,
      };
    } else {
      responseData = {
        ...userData,
      };
    }
    return responseData;
  }

  static async getAllReaders(pageNumber: number, pageSize: number) {
    ValidateFields.queryStringRequired(pageNumber, "Page number");
    ValidateFields.queryStringRequired(pageSize, "Page size");
    const readerCount = await UserRepo.countAllReaders();
    const limit = pageSize;
    const offset = (pageNumber - 1) * limit;
    const response = await UserRepo.getPaginatedReaders(offset, limit);
    return {
      ...response,
      meta: {
        totalPages: Math.ceil(readerCount.count / pageSize),
        currentPage: pageNumber,
        previousPage: pageNumber === 1 ? null : pageNumber - 1,
        nextPage:
          pageNumber + 1 > Math.ceil(readerCount.count / pageSize)
            ? null
            : pageNumber + 1,
        pageSize,
      },
    };
  }
}

export default UserService;
