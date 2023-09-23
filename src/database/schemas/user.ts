import { Schema } from "mongoose";
import { v4 as uuid } from "uuid";

function genUUID(): string {
  return uuid();
}

const userSchema = new Schema({
  _id: { type: String, default: genUUID },
  name: String,
  createdDate: Date,
});

export default userSchema;
