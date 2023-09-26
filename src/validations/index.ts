import Joi from "joi";
import { BadRequestExceptionError } from "@exceptions";
import fs from "fs";
import { Request } from "express";
import { errorMessage } from "@helper";

class ValidateFields {
  static stringRequired(req: Request, field: string, word: string) {
    const schema = Joi.string().required();
    const validation = schema.validate(field);
    if (validation.error) {
      const message = errorMessage(word, validation.error.details[0].message);
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      throw new BadRequestExceptionError(message);
    }
  }

  static integerRequired(field: number, word: string) {
    const schema = Joi.number().integer().min(1).required();
    const validation = schema.validate(field);
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

  static emailValidation(req: Request, email: string) {
    const schema = Joi.string().email().required();
    const validation = schema.validate(email);
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
  }

  static passwordValidation(
    req: Request,
    password: string,
    schema: Joi.StringSchema<string>,
  ) {
    const validation = schema.validate(password);
    if (validation.error) {
      const message = errorMessage(
        "Password",
        validation.error.details[0].message,
      );
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      throw new BadRequestExceptionError(message);
    }
  }
}

export default ValidateFields;
