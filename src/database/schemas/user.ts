import { Schema } from "mongoose";

const userSchema = new Schema({
  name: String,
  createdDate: Date,
});

export default userSchema;
