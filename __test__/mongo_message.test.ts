import setupMongo from "../src/database/setup";
import { MessageModel } from "../src/database/model";

describe("MongoDB User table", () => {
  beforeAll(async () => {
    await setupMongo("test_chat");
    await MessageModel.deleteMany();
  });

  it("Create message", async () => {
    const data = await new MessageModel({
      createdDate: new Date(),
      message: "hello worlds",
      user: "userId"
    }).save();
    expect(data?.message).toBe("hello worlds");
  });

  it("Get message", async () => {
    const data = MessageModel.find({ user: "userId" });
    expect(data).toBeInstanceOf(Object);
  });

  afterAll(async () => {
    await MessageModel.deleteMany();
  });
});
