import { Jwt } from "@utils";
import RatingController from "controller/rating.controller";
import express from "express";

const ratingRoute = express.Router();

ratingRoute.post("/rating", Jwt.verifyToken, RatingController.createRating);

export default ratingRoute;
