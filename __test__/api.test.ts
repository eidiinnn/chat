import setupAPI from "../src/api/index";
import setupMongo from "../src/database/setup";
import request from "supertest";

describe("API Endpoint", () => {
  beforeAll(async () => {
    await setupMongo();
    await setupAPI();
  });

  it("Root Endpoint works", async () => {
    const res = await request("localhost:3000").get("/").send();
    expect(res.statusCode).toBe(200);
  });

  it("Create user", async () => {
    const res = await request("localhost:3000")
      .post("/user")
      .send({ name: "Eduardo" });
    expect(res.body?.name).toBe("Eduardo");
  });
});
