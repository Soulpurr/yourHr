import mongoose from "mongoose";
const { Schema } = mongoose;

const profileSchema = new Schema(
  {
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    email: { type: String, required: true },
    phoneNo: { type: String, required: true },
    age: { type: String, required: true },
    resume: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);
mongoose.models = {};
export default mongoose.model("Profile", profileSchema);
