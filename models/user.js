import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean },
  },
  { timestamps: true }
);
mongoose.models = {};
export default mongoose.model("User", userSchema);