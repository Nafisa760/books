
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true }, // أضفنا fullName
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "student" } 
});

export default mongoose.model("User", userSchema);
  
