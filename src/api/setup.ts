import express, { type Express } from "express";
import log from "../utils/log";
import setupUserApi from "./services/user";
import setupMessageAPI from "./services/message";
import 'dotenv/config'

const app = express();
app.use(express.json());

const setupAPI = async (): Promise<Express> => {
  return await new Promise<Express>((resolve) => {
    app.get("/", (_, req) => {
      req.send("hello world");
    });
    setupUserApi(app);
    setupMessageAPI(app);

    app.listen(
      process.env.SERVER_PORT
      , () => {
        log.info(`listening on port: ${process.env.SERVER_PORT}`);
        resolve(app);
      });
  });
};

export default setupAPI;
