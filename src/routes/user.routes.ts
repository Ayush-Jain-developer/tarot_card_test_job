import express from "express";
import { UserController } from "@controller";
import { Jwt } from "@utils";
import multerUpload from "utils/multer.utils";

const userRoute = express.Router();

userRoute.post("/signUp", multerUpload(), UserController.signUp);
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
userRoute.get("/allReaders", Jwt.verifyToken, UserController.getAllReaders);

export default userRoute;
