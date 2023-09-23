import express from "express";
import log from "../utils/log";

const app = express();

async function setupAPI(): Promise<void> {
  app.get("/", (_, req) => {
    req.send("hello world");
  });

  app.listen(3000, () => {
    log.info("listening");
  });
}

export default setupAPI;
