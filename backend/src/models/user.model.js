import mongoose from "mongoose";

const chatUserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String, // cloudinary url
    default: ""
  }
}, {minimize: false, timestamps: true});

export default mongoose.model("ChatUser", chatUserSchema);