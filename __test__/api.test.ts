import setupAPI from "../src/api/setup";
import { UserModel, MessageModel } from "../src/database/model";
import setupMongo from "../src/database/setup";
import request from "supertest";


describe("API Endpoint", () => {
  const host = "localhost:3000"
  beforeAll(async () => {
    await setupMongo("test_chat");
    await setupAPI();
    await UserModel.deleteMany();
    await MessageModel.deleteMany()
  });

  it("Root Endpoint works", async () => {
    const res = await request(host).get("/").send();
    expect(res.statusCode).toBe(200);
  });

  it("Create user", async () => {
    const res = await request(host)
      .post("/user")
      .send({ name: "Eduardo" });
    expect(res.body?.name).toBe("Eduardo");
  });

  it("Sent message", async () => {
    const resUser = await request(host)
      .post("/user")
      .send({ name: "Eduardo" });

    const resMessage = await request(host).post('/message').send({ token: resUser.body.token, message: "it's a message" });
    expect(resMessage.statusCode).toBe(200);
  })

  afterAll(async () => {
    await UserModel.deleteMany();
    await MessageModel.deleteMany()
  })
});
