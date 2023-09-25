/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import express, { NextFunction, Request, Response } from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import { dbConnection } from "@database/connection";
import { databaseSync } from "@database/models";
import userRoute from "@routes";
import Messages from "@messages";

const NODE_ENV = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${NODE_ENV}` });

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = process.env.PORT || 3000;

io.on("connection", (socket) => {
  console.log("User connected");
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

const corsOptions = {
  origin: "*",
  methods: ["POST", "GET", "PUT", "DELETE"],
  Headers: ["Authorization", "Content-Type"],
};

app.use(cors(corsOptions));
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(userRoute);

server.listen(port, () => {
  console.log(Messages.server + port);
});

async function dbConnect() {
  await dbConnection();
  await databaseSync();
}
dbConnect();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: any, req: Request, res: Response, next: NextFunction) =>
  res.json({
    status: error.statusCode || 500,
    message: error.message || Messages.serverError,
  }),
);
