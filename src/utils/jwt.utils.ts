import UserInterface from "@interfaces";
import jwt from "jsonwebtoken";

class Jwt {
  static createToken(
    payLoad: Omit<UserInterface, "confirmPassword">,
    secretKey: string,
  ) {
    return jwt.sign(payLoad, secretKey);
  }

  static verifyToken(token: string, secretKey: string) {
    return jwt.verify(token, secretKey);
  }
}

export default Jwt;
