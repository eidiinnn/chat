import setupAPI from "../src/api/setup";
import { UserModel, MessageModel } from "../src/database/model";
import setupMongo from "../src/database/setup";
import request from "supertest";
import "dotenv/config";
import { io } from "socket.io-client";

describe("API Endpoint", () => {
  const host = `localhost:${process.env.SERVER_PORT}`;
  beforeAll(async () => {
    await setupMongo("test_chat");
    await setupAPI();
    await UserModel.deleteMany();
    await MessageModel.deleteMany();
  });

  it("Root Endpoint works", async () => {
    const res = await request(host).get("/").send();
    expect(res.statusCode).toBe(200);
  });

  it("Create user", async () => {
    const res = await request(host).post("/user").send({ name: "Eduardo" });
    expect(res.body?.name).toBe("Eduardo");
  });

  it("Sent message", async () => {
    const resUser = await request(host).post("/user").send({ name: "Eduardo" });

    const resMessage = await request(host)
      .post("/message")
      .set("authorization", resUser.body.token)
      .send({ message: "it's a message" });
    expect(resMessage.statusCode).toBe(200);
  });

  it("Receive message by socket", (done) => {
    const socket = io(`http://[localhost]:${process.env.SERVER_PORT}`, {
      transports: ["websocket"],
    });
    socket.once("message", (v) => {
      expect(v.message).toBe("socket");
      done();
    });

    request(host)
      .post("/user")
      .send({ name: "Eduardo" })
      .then(async (resUser) => {
        await request(host)
          .post("/message")
          .set("authorization", resUser.body.token)
          .send({ message: "socket" });
      });
  });

  it("Sent wrong token", async () => {
    const data = await request(host)
      .post("/message")
      .set("authorization", "invalid_token")
      .send({ message: "socket" });

    expect(data.status).toBe(401);
  });

  afterAll(async () => {
    await UserModel.deleteMany();
    await MessageModel.deleteMany();
  });
});
