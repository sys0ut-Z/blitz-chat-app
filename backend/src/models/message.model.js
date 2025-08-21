import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ChatUser",
    required: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ChatUser",
    required: true,
  },
  text: {
    type: String,
  },
  image: {
    type: String, // cloudinary url
  }
}, {timestamps: true});

export default mongoose.model("ChatMessage", messageSchema);