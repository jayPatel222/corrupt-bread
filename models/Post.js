const mongoose = require("mongoose");
const User = require("./User");
const Schema = mongoose.Schema;
const ProfileSchema = new mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  name: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  avatar: {
    type: String,
  },
  likes: [{ user: { type: Schema.Types.ObjectId, ref: "users" } }],
  comments: [
    {
      user: { type: Schema.Types.ObjectId },
      text: {
        type: String,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      avatar: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});
module.exports = Post = mongoose.model("post", ProfileSchema);
