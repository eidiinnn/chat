import { Schema } from "mongoose";
import genUUID from "../../utils/genUUID";

const userSchema = new Schema({
  _id: { type: String, default: genUUID },
  token: { type: String, default: genUUID },
  name: String,
  createdDate: Date,
});

export default userSchema;
