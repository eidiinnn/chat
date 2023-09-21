import express from "express";

const app = express();

async function setupAPI(): Promise<void> {
  app.get("/", (_, req) => {
    req.send("hello world");
  });

  app.listen(3000, () => {
    console.log("listening");
  });
}

export default setupAPI;
