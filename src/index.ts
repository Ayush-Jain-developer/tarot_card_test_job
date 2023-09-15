import express, { Request, Response, NextFunction } from "express";
import http from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import { dbConnection } from "@database/connection";
import { databaseSync } from "@database/models";
import { userRoute } from "@routes";
import { Messages } from "@messages";

dotenv.config({ path: ".env" });

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = process.env.PORT;

io.on("connection", (socket) => {
  console.log("User connected");
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.use(express.json());
app.use(userRoute);

server.listen(port, () => {
  console.log(Messages.server + port);
});

(async function () {
  await dbConnection();
  await databaseSync();
})();

app.use((error: any,req: Request, res: Response,next:NextFunction) => {
  return res.json({
    status: error.statusCode || 500,
    message: error.message || Messages.serverError,
  });
});
