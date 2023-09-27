import Joi from "joi";
import { BadRequestExceptionError } from "@exceptions";
import { errorMessage } from "@helper";

class ValidateFields {
  static stringRequired(field: string, word: string) {
    const schema = Joi.string().required();
    const validation = schema.validate(field);
    if (validation.error) {
      const message = errorMessage(word, validation.error.details[0].message);
      throw new BadRequestExceptionError(message);
    }
  }

  static integerRequired(field: number, word: string) {
    const schema = Joi.number().integer().min(1).max(5).required();
    const validation = schema.validate(field);
    if (validation.error) {
      const message = errorMessage(word, validation.error.details[0].message);
      throw new BadRequestExceptionError(message);
    }
  }

  static decimalRequired(field: number, word: string) {
    const decimalSchema = Joi.number()
      .precision(2)
      .min(0)
      .max(9999999.99)
      .required();
    const validation = decimalSchema.validate(field);
    if (validation.error) {
      const message = errorMessage(word, validation.error.details[0].message);
      throw new BadRequestExceptionError(message);
    }
  }

  static queryStringRequired(field: number, word: string) {
    const querySchema = Joi.number().integer().min(1).required();
    const validation = querySchema.validate(field);
    if (validation.error) {
      const message = errorMessage(word, validation.error.details[0].message);
      throw new BadRequestExceptionError(message);
    }
  }

  static arrayRequired(field: string[], word: string) {
    const schema = Joi.array().items(Joi.string()).min(1);
    const validation = schema.validate(field);
    if (validation.error) {
      const message = errorMessage(word, validation.error.details[0].message);
      throw new BadRequestExceptionError(message);
    }
  }

  static emailValidation(email: string) {
    const schema = Joi.string().email().required();
    const validation = schema.validate(email);
    if (validation.error) {
      const message = errorMessage(
        "Email",
        validation.error.details[0].message,
      );
      throw new BadRequestExceptionError(message);
    }
  }

  static passwordValidation(
    password: string,
    schema: Joi.StringSchema<string>,
  ) {
    const validation = schema.validate(password);
    if (validation.error) {
      const message = errorMessage(
        "Password",
        validation.error.details[0].message,
      );
      throw new BadRequestExceptionError(message);
    }
  }
}

export default ValidateFields;
