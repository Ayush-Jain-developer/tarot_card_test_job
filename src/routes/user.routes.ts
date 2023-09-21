import express from "express";
import UserController from "@controller";
import Jwt from "@utils";

const userRoute = express.Router();

userRoute.post("/signUp", UserController.signUp);
userRoute.post("/logIn", UserController.logIn);
userRoute.put(
  "/readerProfile",
  Jwt.verifyToken,
  UserController.updateReaderProfile,
);

export default userRoute;
