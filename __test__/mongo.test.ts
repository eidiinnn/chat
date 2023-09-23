import setupMongo from "../src/database/setup";
import { UserModel } from "../src/database/model";

describe("MongoDb", () => {
  beforeAll(async () => {
    await setupMongo("test_chat");
    await UserModel.deleteMany();
  });

  it("set user", async () => {
    const data = await new UserModel({
      createdDate: new Date(),
      name: "Eduardo",
    }).save();
    console.log(data);
  });

  it("get user", async () => {
    const data = UserModel.find({ name: "Eduardo" });
    expect(data).toBeInstanceOf(Object);
  });

  afterAll(async () => {
    await UserModel.deleteMany();
  });
});
