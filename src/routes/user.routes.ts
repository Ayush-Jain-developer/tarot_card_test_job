import express from "express";
import UserController from "@controller";
import Jwt from "@utils";

const userRoute = express.Router();

userRoute.post("/signUp", UserController.signUp);
userRoute.post("/logIn", UserController.logIn);
userRoute.post(
  "/refreshToken",
  Jwt.verifyToken,
  UserController.tokenGeneration,
);
userRoute.put(
  "/readerProfile",
  Jwt.verifyToken,
  UserController.updateReaderProfile,
);
userRoute.get("/user", Jwt.verifyToken, UserController.getUser);

export default userRoute;
