import mongoose from "mongoose";
const UserSchema = mongoose.Schema(
  {
    career: { type: "string", required: [true] },
    level: { type: "string", required: [true] },
    plan: { type: "string", required: [true] },
  },
  {
    versionKey: false,
  }
);
const User = mongoose.model("User", UserSchema);
export default User;
