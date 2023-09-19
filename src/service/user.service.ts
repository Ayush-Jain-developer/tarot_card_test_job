import Joi from "joi";
import UserInterface from "@interfaces";
import BadRequestExceptionError from "@exceptions";
import { ValidateFields, errorMessage } from "@helper";
import bcrypt from "bcrypt";
import UserRepo from "@repo";
import Messages from "@messages";
import Jwt from "@utils";
import dotenv from "dotenv";

const NODE_ENV = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${NODE_ENV}` });
const secretKey = process.env.SECRET_KEY as string;

class UserService {
  static async signUp(data: UserInterface) {
    const emailSchema = Joi.string().email().required();
    const emailValidation = emailSchema.validate(data.email);
    if (emailValidation.error) {
      const message = errorMessage(
        "Email",
        emailValidation.error.details[0].message,
      );

      throw new BadRequestExceptionError(message);
    }
    const email = data.email.toLowerCase();
    const user = await UserRepo.findUser(email);
    if (user) {
      throw new BadRequestExceptionError(Messages.emailExist);
    }
    ValidateFields.stringRequired(data.role, "Role");
    const passwordSchema = Joi.string().min(8).max(30).required();
    const passwordValidation = passwordSchema.validate(data.password);
    if (passwordValidation.error) {
      const message = errorMessage(
        "Password",
        passwordValidation.error.details[0].message,
      );
      throw new BadRequestExceptionError(message);
    }
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

    const token = Jwt.createToken(createdUser.dataValues, secretKey);

    return { ...createdUser.dataValues, token };
  }
}

export default UserService;
