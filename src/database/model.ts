import userSchema from "./schemas/user";
import mongoose from "mongoose";

export const UserModel = mongoose.model("user", userSchema);
