import mongoose from "mongoose";

export default async function setupMongo(
  database?: string
): Promise<typeof mongoose> {
  try {
    console.log("connecting to mongo");
    const mongo = await mongoose.connect(
      `mongodb://127.0.0.1:27017/${database ?? "chat"}`,
      {
        connectTimeoutMS: 5000,
      }
    );
    console.log("mongo connected");
    return mongo;
  } catch (e) {
    return await Promise.reject(e);
  }
}
