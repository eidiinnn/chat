import { Schema } from "mongoose";
import genUUID from "../../utils/genUUID";

const messageSchema = new Schema({
  _id: { type: String, default: genUUID },
  user: String,
  message: String,
  createdDate: Date,
});

export default messageSchema;
