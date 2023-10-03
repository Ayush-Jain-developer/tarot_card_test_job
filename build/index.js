"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = require("@database/connection");
const models_1 = require("@database/models");
const _routes_1 = require("@routes");
const _messages_1 = __importDefault(require("@messages"));
const NODE_ENV = process.env.NODE_ENV || "development";
dotenv_1.default.config({ path: `.env.${NODE_ENV}` });
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
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
app.use((0, cors_1.default)(corsOptions));
// app.use(express.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(_routes_1.userRoute, _routes_1.ratingRoute, _routes_1.productRoute, _routes_1.paymentsRoute);
server.listen(port, () => {
    console.log(_messages_1.default.server + port);
});
async function dbConnect() {
    await (0, connection_1.dbConnection)();
    await (0, models_1.databaseSync)();
}
dbConnect();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error, req, res, next) => res.json({
    status: error.statusCode || 500,
    message: error.message || _messages_1.default.serverError,
}));
