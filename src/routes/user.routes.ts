import express from "express";
import UserController from "@controller";

const userRoute = express.Router();

userRoute.post("/signUp", UserController.signUp);

export default userRoute;
