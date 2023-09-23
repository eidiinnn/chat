import log from "../utils/log";
import mongoose from "mongoose";

export default async function setupMongo(
  database?: string
): Promise<typeof mongoose> {
  try {
    log.info("connecting to mongo");
    const mongo = await mongoose.connect(
      `mongodb://127.0.0.1:27017/${database ?? "chat"}`,
      {
        connectTimeoutMS: 5000,
      }
    );
    log.info("mongo connected");
    return mongo;
  } catch (e) {
    log.error("Error to setup mongo", e);
    return await Promise.reject(e);
  }
}
