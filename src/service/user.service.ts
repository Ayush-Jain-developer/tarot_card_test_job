import Joi from "joi";
import { UserInterface } from "@interfaces";
import { BadRequestExceptionError } from "@exceptions";
import { ValidateFields, errorMessage,  } from "@helper";
import bcrypt from "bcrypt";
import { UserRepo } from "@repo";
import { Messages } from "@messages";

export class UserService {
  static async signUp(data: UserInterface) {
    const emailSchema = Joi.string().email().required();
    const emailValidation = emailSchema.validate(data.email);
    if (emailValidation.error) {
      const message = errorMessage(
        "Email",
        emailValidation.error.details[0].message
      );

      throw new BadRequestExceptionError(message);
    }
    const user = await UserRepo.findUser(data.email);
    if (user) {
      throw new BadRequestExceptionError(Messages.emailExist);
    }
    ValidateFields.stringRequired(data.role,'Role')
    const passwordSchema = Joi.string().min(8).max(30).required();
    const passwordValidation = passwordSchema.validate(data.password);
    if (passwordValidation.error) {
      const message = errorMessage(
        "Password",
        passwordValidation.error.details[0].message
      );
      throw new BadRequestExceptionError(
        message
      );
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(data.password, salt);
    const userData = {
      email: data.email,
      password: hash,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role,
    };

    return UserRepo.createUser(userData);
  }
}
