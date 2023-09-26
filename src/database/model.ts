import messageSchema from "./schemas/message";
import userSchema from "./schemas/user";
import mongoose from "mongoose";

export const UserModel = mongoose.model("user", userSchema);
export const MessageModel = mongoose.model("messages", messageSchema);
