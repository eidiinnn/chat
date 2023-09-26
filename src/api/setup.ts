import express, { type Express } from "express";
import log from "../utils/log";
import setupUserApi from "./services/user";
import setupMessageAPI from "./services/message";

const app = express();
app.use(express.json());

const setupAPI = async (): Promise<Express> => {
  return await new Promise<Express>((resolve) => {
    app.get("/", (_, req) => {
      req.send("hello world");
    });
    setupUserApi(app);
    void setupMessageAPI(app);

    app.listen(3000, () => {
      log.info("listening");
      resolve(app);
    });
  });
};

export default setupAPI;
