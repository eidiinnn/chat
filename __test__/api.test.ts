import setupAPI from "../src/api/index";
import request from "supertest";

describe("API Endpoint", () => {
  beforeAll(async () => {
    await setupAPI();
  });

  it("Root Endpoint works", async () => {
    const res = await request("localhost:3000").get("/").send();
    expect(res.statusCode).toBe(200);
  });
});
