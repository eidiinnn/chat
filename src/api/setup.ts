import express, { type Express } from "express";
import log from "../utils/log";
import setupUserApi from "./services/user";
import setupMessageAPI from "./services/message";
import "dotenv/config";
import http from "http";
import Socket from "socket.io";
import setupChatSocket from "./services/chat";

const app = express();
app.use(express.json());
const httpServer = http.createServer(app);
const io = new Socket.Server(httpServer);

const setupAPI = async (): Promise<Express> => {
  return await new Promise<Express>((resolve) => {
    app.get("/", (_, req) => {
      req.send("hello world");
    });
    setupUserApi(app);
    setupMessageAPI(app, io);

    httpServer.listen(process.env.SERVER_PORT, () => {
      log.info(`listening on port: ${process.env.SERVER_PORT}`);
      resolve(app);
    });
  });
};

export default setupAPI;
